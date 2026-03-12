import { useState, useEffect } from 'react';

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';

export const useWaitlist = (referralId: string | null) => {
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(87);
  const [userId, setUserId] = useState<string | null>(null);
  const [userReferrals, setUserReferrals] = useState(0);
  const [userInitialRank, setUserInitialRank] = useState(0);

  // Fetch count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist');
        if (response.ok) {
          const data = await response.json();
          setWaitlistCount(data.count || 87);
        }
      } catch (err) {
        console.error('Failed to fetch waitlist count:', err);
      }
    };
    fetchCount();
    
    // Optional: poll every 30 seconds
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const joinWaitlist = async (whatsapp: string, email: string) => {
    setStatus('loading');
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get('utm_source');
      const utm_medium = urlParams.get('utm_medium');
      const utm_campaign = urlParams.get('utm_campaign');
      const referrer = document.referrer;

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          whatsapp,
          utm_source,
          utm_medium,
          utm_campaign,
          referrer,
          referralId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join waitlist');
      }

      const data = await response.json();
      
      setUserId(email.toLowerCase().trim());
      setUserInitialRank(data.position);
      setWaitlistCount(data.position);

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
    userReferrals,
    userInitialRank,
    joinWaitlist,
    resetStatus
  };
};
