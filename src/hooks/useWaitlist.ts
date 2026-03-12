import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, doc, onSnapshot, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';

export const useWaitlist = (referralId: string | null) => {
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(87);
  const [userId, setUserId] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
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
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get('utm_source');
      const utm_medium = urlParams.get('utm_medium');
      const utm_campaign = urlParams.get('utm_campaign');
      
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          whatsapp, 
          utm_source,
          utm_medium,
          utm_campaign,
          referrer: referralId
        })
      });

      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error(text || 'A server error occurred. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist');
      }

      setUserId(email.trim().toLowerCase());
      setUserInitialRank(result.data.rank);
      setUserReferrals(result.data.referralCount || 0);
      // Store referralCode separately for sharing
      setReferralCode(result.data.referralCode);

      setStatus('success');
    } catch (error: any) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Ocorreu um erro ao salvar seu contato. Por favor, tente novamente.');
    }
  };

  const resetStatus = () => setStatus('idle');

  return {
    status,
    errorMessage,
    waitlistCount,
    userId,
    referralCode,
    userReferrals,
    userInitialRank,
    joinWaitlist,
    resetStatus
  };
};
