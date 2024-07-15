export const donationConfig = {
    paypalEmail: 'your-paypal-email@example.com',
    currency: 'EUR',
    serverName: 'Tu nombre de servidor',
    pageTitle: 'Apoya nuestro servidor',
    buttonText: 'Donar con PayPal',
    fallbackLinkText: 'haz clic aquí para donar',
    donationTiers: [
        {
            id: 1,
            name: 'Donador Nivel 1',
            price: 5.00,
            benefits: [
                "Placeholder",
            ]
        },
        {
            id: 2,
            name: 'Donador Nivel 2',
            price: 10.00,
            benefits: [
                "Placeholder",
            ]
        },
        {
            id: 3,
            name: 'Donador Nivel 3',
            price: 20.00,
            benefits: [
                "Placeholder",
            ]
        }
    ]
};