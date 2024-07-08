import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const SERVER_ID = '67001';
const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.scplist.kr/api/servers/${SERVER_ID}`)}`;

const ServerInfoField = React.memo(({ label, value, isHtml, fontSize }) => (
    <>
        <p className="font-semibold text-gray-400" style={{ fontSize }}>
            {label}
        </p>
        <p className="text-white" style={{ fontSize }}>
            {isHtml ? <span dangerouslySetInnerHTML={{ __html: value }} /> : value || "N/A"}
        </p>
    </>
));

const ServerInfo = () => {
    const { adaptFontSize, adaptSpacing, adaptGridColumns, isBreakpoint } = useScreenAdapter();
    const [serverData, setServerData] = useState(null);
    const [status, setStatus] = useState({ loading: true, error: null });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(API_URL, { signal })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setServerData(data);
                setStatus({ loading: false, error: null });
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    setStatus({ loading: false, error: error.message });
                }
            });

        return () => controller.abort();
    }, []);

    const serverInfoFields = useMemo(() => {
        if (!serverData) return [];
        const frameworkInfo = serverData.techList?.map(tech => `${tech.name} v${tech.version}`).join(', ') || "Vanilla or Custom Framework";
        return [
            { label: "Server Name:", value: serverData.info, isHtml: true },
            { label: "Players:", value: serverData.players?.split('/').slice(0, 2).join('/') || "0/30" },
            { label: "Version:", value: serverData.version },
            { label: "Friendly Fire:", value: serverData.friendlyFire ? "Enabled" : "Disabled" },
            { label: "Status:", value: serverData.online ? "Online" : "Offline" },
            { label: "Framework:", value: frameworkInfo }
        ];
    }, [serverData]);

    if (status.loading) return <p>Loading...</p>;
    if (status.error) return <p>Error loading data: {status.error}</p>;

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
                SCP:SL Server Information
            </motion.h1>
            <motion.div
                className="bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ padding: adaptSpacing(32) }}
            >
                <div className={`grid gap-6 grid-cols-${adaptGridColumns(2)}`}>
                    {serverInfoFields.map((field, index) => (
                        <ServerInfoField
                            key={index}
                            {...field}
                            fontSize={adaptFontSize(isBreakpoint('md') ? 16 : 14)}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default React.memo(ServerInfo);