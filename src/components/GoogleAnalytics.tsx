import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export function GoogleAnalytics() {
  const location = useLocation();
  const initRef = useRef(false);

  useEffect(() => {
    // Use the specific Measurement ID from the Google Analytics dashboard
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-RG4VV8TP1E";
    
    // Always call default consent before GA initialization as per Google guidelines
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    function gtag(...args: any[]){
      win.dataLayer.push(args);
    }

    const consent = localStorage.getItem('cookie_consent');
    const isGranted = consent === 'granted';

    if (!initRef.current) {
      // First script load default consent configuration
      gtag('consent', 'default', {
        ad_storage: isGranted ? 'granted' : 'denied',
        analytics_storage: isGranted ? 'granted' : 'denied',
      });

      if (measurementId) {
        ReactGA.initialize(measurementId);
      }
      initRef.current = true;
    }

    const handleConsentUpdate = () => {
      const updatedConsent = localStorage.getItem('cookie_consent') === 'granted';
      gtag('consent', 'update', {
        ad_storage: updatedConsent ? 'granted' : 'denied',
        analytics_storage: updatedConsent ? 'granted' : 'denied',
      });
    };

    window.addEventListener('cookie_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
  }, []);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-RG4VV8TP1E";
    if (initRef.current && measurementId) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  return null;
}
