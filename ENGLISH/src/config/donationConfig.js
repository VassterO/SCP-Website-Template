export const donationConfig = {
    paypalEmail: 'your-paypal-email@example.com',
    currency: 'USD',
    serverName: 'Your server name',
    pageTitle: 'Support Our Server',
    buttonText: 'Donate with PayPal',
    fallbackLinkText: 'click here to donate',
    donationTiers: [
        {
            id: 1,
            name: 'Donor Level 1',
            price: 5.00,
            benefits: [
                "Placeholder",
            ]
        },
        {
            id: 2,
            name: 'Donor Level 2',
            price: 10.00,
            benefits: [
                "Placeholder",
            ]
        },
        {
            id: 3,
            name: 'Donor Level 3',
            price: 20.00,
            benefits: [
                "Placeholder",
            ]
        }
    ]
};