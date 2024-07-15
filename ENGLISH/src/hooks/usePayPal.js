import { useState, useCallback } from 'react';
import { createPayPalDonationUrl } from '../utils/helpers';

export function usePayPal() {
    const [paypalLink, setPaypalLink] = useState('');

    const handleDonate = useCallback((price, tierName) => {
        const fullUrl = createPayPalDonationUrl(price, tierName);
        setPaypalLink(fullUrl);
        window.open(fullUrl, '_blank');
    }, []);

    return { paypalLink, handleDonate };
}