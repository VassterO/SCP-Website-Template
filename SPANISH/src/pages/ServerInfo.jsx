import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const SERVER_ID = '44415'; // Replace 'ServerID' with your ServerID -> Get it via 'scplist.kr'
const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.scplist.kr/api/servers/${SERVER_ID}`)}`;

const ServerInfo = () => {
    const { adaptFontSize, adaptSpacing } = useScreenAdapter();
    const [serverData, setServerData] = useState(null);
    const [status, setStatus] = useState({ loading: true, error: null });

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setServerData(data);
                setStatus({ loading: false, error: null });
            })
            .catch(error => setStatus({ loading: false, error: error.message }));
    }, []);

    if (status.loading) return <p>Loading...</p>;
    if (status.error) return <p>Error loading data: {status.error}</p>;

    const frameworkInfo = serverData?.techList?.map(tech => `${tech.name} v${tech.version}`).join(', ') || "Vanilla o Framework Custom";
    
    const serverInfoFields = [
        { label: "Nombre del Servidor:", value: serverData?.info, isHtml: true },
        { label: "Jugadores:", value: serverData?.players?.split('/').slice(0, 2).join('/') || "0/30" },
        { label: "Versión:", value: serverData?.version },
        { label: "Fuego Amigo:", value: serverData?.friendlyFire ? "Activado" : "Desactivado" },
        { label: "Estado:", value: serverData?.online ? "Online" : "Offline" },
        { label: "Framework:", value: frameworkInfo }
    ];

    return (
        <motion.div
            className="container mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ padding: `${adaptSpacing(96)} 0` }}
        >
            <motion.h1
                className="font-bold mb-12 text-red-500 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: adaptFontSize(48) }}
            >
                Información del Servidor SCP:SL
            </motion.h1>
            <motion.div
                className="bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ padding: adaptSpacing(32) }}
            >
                <div className="grid grid-cols-2 gap-6">
                    {serverInfoFields.map(({ label, value, isHtml }, index) => (
                        <React.Fragment key={index}>
                            <p className="font-semibold text-gray-400" style={{ fontSize: adaptFontSize(16) }}>
                                {label}
                            </p>
                            <p className="text-white" style={{ fontSize: adaptFontSize(16) }}>
                                {isHtml ? <span dangerouslySetInnerHTML={{ __html: value }} /> : value || "N/A"}
                            </p>
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ServerInfo;