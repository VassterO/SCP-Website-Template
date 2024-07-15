import React from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { serverInfoConfig } from '../../config/serverInfoConfig';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const ServerInfoField = ({ label, value, isHtml = false }) => (
    <div className="mb-2">
        <p className="text-gray-400">{label}</p>
        {isHtml ? (
            <p className="text-white" dangerouslySetInnerHTML={{ __html: value || "N/D" }} />
        ) : (
            <p className="text-white">{value || "N/D"}</p>
        )}
    </div>
);

const StatusIndicator = ({ isOnline }) => (
    <div className="flex items-center mb-4">
        <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={isOnline ? 'text-green-500' : 'text-red-500'}>
            {isOnline ? 'En línea' : 'Fuera de línea'}
        </span>
    </div>
);

const ServerInfo = () => {
    const { data: serverData, error } = useSWR(serverInfoConfig.API_URL, fetcher, {
        refreshInterval: 30000, // Actualizar cada 30 segundos
        revalidateOnFocus: true,
    });

    if (!serverData && !error) return <div className="text-center">Cargando...</div>;

    if (error) return (
        <div className="text-center text-red-500">
            Error al cargar la información del servidor.
        </div>
    );

    const getFramework = () => {
        if (serverData.techList && serverData.techList.length > 0) {
            const framework = serverData.techList.find(tech => tech.name.toLowerCase().includes('exiled'));
            return framework ? `${framework.name} v${framework.version}` : 'N/D';
        }
        return 'N/D';
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
                <ServerInfoField label="Nombre del Servidor:" value={serverData.info} isHtml={true} />
                <ServerInfoField label="Jugadores:" value={serverData.players} />
                <ServerInfoField label="Versión:" value={serverData.version} />
                <ServerInfoField label="Fuego Amigo:" value={serverData.friendlyFire ? "Activado" : "Desactivado"} />
                <ServerInfoField label="Framework:" value={getFramework()} />
            </div>
        </div>
    );
};

export default ServerInfo;