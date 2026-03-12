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
      const emailKey = email.toLowerCase().trim();
      
      if (referralId) {
        try {
          await updateDoc(doc(db, 'waitlist', referralId), {
            referralCount: increment(1)
          });
        } catch (err) {
          console.error('Error updating referrer:', err);
        }
      }

      await setDoc(doc(db, 'waitlist', emailKey), {
        email,
        whatsapp,
        rank: currentRank,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: serverTimestamp(),
        source: 'waitlist_page',
        referralCount: 0,
        ...(referralId ? { referral: referralId } : {})
      });

      setUserId(emailKey);
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
