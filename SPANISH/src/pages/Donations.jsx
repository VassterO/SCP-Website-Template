import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const DonationTier = React.memo(({ level, price, benefits }) => {
    const { adaptFontSize, adaptSpacing, isBreakpoint } = useScreenAdapter();

    return (
        <motion.div
            className="bg-gray-800 rounded-lg shadow-lg mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{ padding: adaptSpacing(isBreakpoint('lg') ? 24 : 16) }}
        >
            <h3 className="font-semibold mb-4 text-yellow-400" style={{ fontSize: adaptFontSize(isBreakpoint('lg') ? 24 : 20) }}>Donador Nivel {level} - {price}€</h3>
            <ul className="list-disc list-inside space-y-2 mb-6" style={{ fontSize: adaptFontSize(isBreakpoint('md') ? 16 : 14) }}>
                {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>
            <motion.button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: adaptFontSize(16), padding: `${adaptSpacing(isBreakpoint('lg') ? 12 : 8)} ${adaptSpacing(isBreakpoint('lg') ? 24 : 16)}` }}
            >
                Donar con PayPal
            </motion.button>
        </motion.div>
    );
});

const Donations = () => {
    const { adaptFontSize, adaptSpacing, adaptGridColumns, isBreakpoint } = useScreenAdapter();

    const donationTiers = useMemo(() => [
        {
            level: 1,
            price: 0,
            benefits: [
                "Placeholder",
                "Placeholder",
                "Placeholder"
            ]
        },
        {
            level: 2,
            price: 0,
            benefits: [
                "Placeholder",
                "Placeholder",
                "Placeholder"
            ]
        },
        {
            level: 3,
            price: 0,
            benefits: [
                "Placeholder",
                "Placeholder",
                "Placeholder"
            ]
        }
    ], []);

    return (
        <div className="container mx-auto px-4" style={{ paddingTop: adaptSpacing(isBreakpoint('lg') ? 96 : 64), paddingBottom: adaptSpacing(isBreakpoint('lg') ? 96 : 64) }}>
            <motion.h1
                className="font-bold mb-12 text-red-500 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: adaptFontSize(isBreakpoint('lg') ? 48 : 36) }}
            >
                Apoya [El nombre de tu servidor]
            </motion.h1>
            <div className={`max-w-4xl mx-auto grid gap-8 grid-cols-${adaptGridColumns(3)}`}>
                {donationTiers.map((tier, index) => (
                    <DonationTier
                        key={index}
                        level={tier.level}
                        price={tier.price}
                        benefits={tier.benefits}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Donations);
