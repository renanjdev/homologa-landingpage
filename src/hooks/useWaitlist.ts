import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '../firebase';

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const useWaitlist = (referralId: string | null) => {
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(87);
  const [userId, setUserId] = useState<string | null>(null);
  const [userReferrals, setUserReferrals] = useState(0);
  const [userInitialRank, setUserInitialRank] = useState(0);

  // Listen to real-time counter
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setWaitlistCount(Math.max(87, data.waitlistCount || 0));
      }
    }, (error) => {
      console.error('Error listening to stats:', error);
    });
    return () => unsub();
  }, []);

  // Listen to user's own document for referral updates
  useEffect(() => {
    if (!userId) return;
    const unsub = onSnapshot(doc(db, 'waitlist', userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserReferrals(data.referralCount || 0);
        setUserInitialRank(data.initialRank || 0);
      }
    }, (error) => {
      console.error('Error listening to user entry:', error);
    });
    return () => unsub();
  }, [userId]);

  const joinWaitlist = async (whatsapp: string, email: string) => {
    setStatus('loading');
    try {
      const currentRank = waitlistCount + 1;
      
      const waitlistData: any = {
        whatsapp,
        email,
        createdAt: serverTimestamp(),
        source: 'waitlist_page',
        initialRank: currentRank,
        referralCount: 0
      };
      
      if (referralId) {
        waitlistData.referral = referralId;
        try {
          await updateDoc(doc(db, 'waitlist', referralId), {
            referralCount: increment(1)
          });
        } catch (err) {
          console.error('Error updating referrer:', err);
          // We don't fail the whole process if referral update fails
        }
      }

      let docRef;
      try {
        docRef = await addDoc(collection(db, 'waitlist'), waitlistData);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'waitlist');
      }

      if (!docRef) throw new Error('Failed to create waitlist entry');

      setUserId(docRef.id);
      setUserInitialRank(currentRank);

      const statsRef = doc(db, 'stats', 'global');
      try {
        const statsSnap = await getDoc(statsRef);
        
        if (statsSnap.exists()) {
          await updateDoc(statsRef, {
            waitlistCount: increment(1)
          });
        } else {
          await setDoc(statsRef, {
            waitlistCount: waitlistCount + 1
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'stats/global');
      }

      // Send confirmation email via server
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get('utm_source');
        const utm_medium = urlParams.get('utm_medium');
        const utm_campaign = urlParams.get('utm_campaign');
        const referrer = document.referrer;

        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            whatsapp, 
            rank: currentRank,
            utm_source,
            utm_medium,
            utm_campaign,
            referrer
          })
        });
      } catch (emailErr) {
        console.error('Failed to trigger email confirmation:', emailErr);
      }

      setStatus('success');
    } catch (error: any) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
      
      // Try to parse the JSON error if it's from our handler
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.error.includes('insufficient permissions')) {
          setErrorMessage('Erro de permissão no banco de dados. Por favor, contate o suporte.');
        } else {
          setErrorMessage('Ocorreu um erro ao salvar seu contato. Por favor, tente novamente.');
        }
      } catch {
        setErrorMessage('Ocorreu um erro ao salvar seu contato. Por favor, tente novamente.');
      }
    }
  };

  const resetStatus = () => setStatus('idle');

  return {
    status,
    errorMessage,
    waitlistCount,
    userId,
    userReferrals,
    userInitialRank,
    joinWaitlist,
    resetStatus
  };
};
