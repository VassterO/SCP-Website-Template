import React from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const DonationTier = ({ level, price, benefits }) => {
    const { adaptFontSize, adaptSpacing } = useScreenAdapter();

    return (
        <motion.div
            className="bg-gray-800 rounded-lg shadow-lg mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{ padding: adaptSpacing(24) }}
        >
            <h3 className="font-semibold mb-4 text-yellow-400" style={{ fontSize: adaptFontSize(24) }}>Donor Level {level} - {price}€</h3>
            <ul className="list-disc list-inside space-y-2 mb-6" style={{ fontSize: adaptFontSize(16) }}>
                {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>
            <motion.button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: adaptFontSize(16), padding: `${adaptSpacing(12)} ${adaptSpacing(24)}` }}
            >
                Donate with PayPal
            </motion.button>
        </motion.div>
    );
};

const Donations = () => {
    const { adaptFontSize, adaptSpacing } = useScreenAdapter();

    return (
        <div className="container mx-auto px-4" style={{ paddingTop: adaptSpacing(96), paddingBottom: adaptSpacing(96) }}>
            <motion.h1
                className="font-bold mb-12 text-red-500 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: adaptFontSize(48) }}
            >
                Support [Your Server Name]
            </motion.h1>
            <div className="max-w-4xl mx-auto">
                <DonationTier
                    level={1}
                    price={5}
                    benefits={[
                        "Access to exclusive channels",
                        "Special donor role",
                        "Early access to events"
                        // Add more benefits as needed
                    ]}
                />
                <DonationTier
                    level={2}
                    price={10}
                    benefits={[
                        "All Level 1 benefits",
                        "Monthly game night invite",
                        "Custom server commands"
                    ]}
                />
                <DonationTier
                    level={3}
                    price={20}
                    benefits={[
                        "All Level 2 benefits",
                        "Direct influence on server features",
                        "Personal thank you message from admins"
                    ]}
                />
            </div>
        </div>
    );
};

export default Donations;
