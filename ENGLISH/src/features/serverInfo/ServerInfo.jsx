import React from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { serverInfoConfig } from '../../config/serverInfoConfig';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const ServerInfoField = ({ label, value, isHtml = false }) => (
    <div className="mb-2">
        <p className="text-gray-400">{label}</p>
        {isHtml ? (
            <p className="text-white" dangerouslySetInnerHTML={{ __html: value || "N/A" }} />
        ) : (
            <p className="text-white">{value || "N/A"}</p>
        )}
    </div>
);

const StatusIndicator = ({ isOnline }) => (
    <div className="flex items-center mb-4">
        <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={isOnline ? 'text-green-500' : 'text-red-500'}>
            {isOnline ? 'Online' : 'Offline'}
        </span>
    </div>
);

const ServerInfo = () => {
    const { data: serverData, error } = useSWR(serverInfoConfig.API_URL, fetcher, {
        refreshInterval: 30000, // Refresh every 30 seconds
        revalidateOnFocus: true,
    });

    if (!serverData && !error) return <div className="text-center">Loading...</div>;

    if (error) return (
        <div className="text-center text-red-500">
            Error loading server information.
        </div>
    );

    const getFramework = () => {
        if (serverData.techList && serverData.techList.length > 0) {
            const framework = serverData.techList.find(tech => tech.name.toLowerCase().includes('exiled'));
            return framework ? `${framework.name} v${framework.version}` : 'N/A';
        }
        return 'N/A';
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-900">
            <motion.h1
                className="text-3xl font-bold mb-8 text-red-500 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {serverInfoConfig.title}
            </motion.h1>
            <div className={`${serverInfoConfig.cardBackgroundColor} rounded-lg p-6 max-w-2xl mx-auto`}>
                <StatusIndicator isOnline={serverData.online} />
                <ServerInfoField label="Server Name:" value={serverData.info} isHtml={true} />
                <ServerInfoField label="Players:" value={serverData.players} />
                <ServerInfoField label="Version:" value={serverData.version} />
                <ServerInfoField label="Friendly Fire:" value={serverData.friendlyFire ? "Enabled" : "Disabled"} />
                <ServerInfoField label="Framework:" value={getFramework()} />
            </div>
        </div>
    );
};

export default ServerInfo;