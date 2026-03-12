import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';

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
        }
      }

      const docRef = await addDoc(collection(db, 'waitlist'), waitlistData);

      setUserId(docRef.id);
      setUserInitialRank(currentRank);

      const statsRef = doc(db, 'stats', 'global');
      const statsSnap = await getDoc(statsRef);
      
      if (statsSnap.exists()) {
        await updateDoc(statsRef, {
          waitlistCount: increment(1)
        });
      } else {
        await setDoc(statsRef, {
          waitlistCount: 88
        });
      }

      // Send confirmation email via server
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get('utm_source');
        const utm_medium = urlParams.get('utm_medium');
        const utm_campaign = urlParams.get('utm_campaign');

        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            whatsapp, 
            rank: currentRank,
            utm_source,
            utm_medium,
            utm_campaign
          })
        });
      } catch (emailErr) {
        console.error('Failed to trigger email confirmation:', emailErr);
        // We don't fail the whole process if email fails
      }

      setStatus('success');
    } catch (error: any) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao salvar seu contato. Por favor, tente novamente.');
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
