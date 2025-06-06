import React, { useMemo, useState, useCallback, Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serverInfoConfig } from '../../config/serverInfoConfig';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FaCopy, FaCheck } from 'react-icons/fa';

export async function loader() {
    const { serverId } = serverInfoConfig;

    // Si el ID no está configurado, se devuelve una señal para mostrar un mensaje útil al desarrollador.
    if (!serverId || serverId === 'Your-Server-ID') {
        return { isConfigured: false, serverPromise: null };
    }

    // Se usa un proxy CORS porque la API de scplist.kr no permite peticiones directas desde el navegador.
    const targetUrl = `https://api.scplist.kr/api/servers/${serverId}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    // La petición se pasa como una promesa para que la UI pueda renderizarse instantáneamente.
    const serverPromise = fetch(proxyUrl).then(res => {
        if (!res.ok) {
            throw new Response("No se pudo obtener la información del servidor a través del proxy.", { status: res.status });
        }
        return res.json();
    });
    return { isConfigured: true, serverPromise };
}

// Componente que se muestra cuando el serverId no está configurado.
const UnconfiguredServer = () => (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <motion.div className="bg-background-light rounded-lg p-6 sm:p-8 w-full max-w-2xl mx-auto shadow-lg border border-accent text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-bold text-accent text-2xl mb-2">¡Acción Requerida!</h2>
            <p className="text-text"> Por favor, configura tu ID de servidor en el archivo: </p>
            <code className="block bg-background p-2 rounded-md my-4 text-primary font-mono"> src/config/serverInfoConfig.js </code>
        </motion.div>
    </div>
);

// Placeholder visual (esqueleto) que se muestra mientras cargan los datos.
const ServerInfoSkeleton = () => (
    <div className="bg-background-light rounded-lg p-6 sm:p-8 w-full max-w-2xl mx-auto shadow-lg border border-border">
        <div className="animate-pulse">
            <div className="flex items-center mb-6 gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-text-dark"></div>
                <div className="w-24 h-6 rounded bg-text-dark"></div>
            </div>
            <div className="space-y-6">
                <div className="space-y-2"><div className="h-4 w-1/3 rounded bg-text-dark"></div><div className="h-6 w-full rounded bg-text-dark/70"></div></div>
                <div className="space-y-2"><div className="h-4 w-1/4 rounded bg-text-dark"></div><div className="h-6 w-1/2 rounded bg-text-dark/70"></div></div>
                <div className="space-y-2"><div className="h-4 w-1/4 rounded bg-text-dark"></div><div className="h-6 w-1/2 rounded bg-text-dark/70"></div></div>
            </div>
            <div className="h-12 w-full mt-6 rounded-md bg-text-dark"></div>
        </div>
    </div>
);

// Componente que muestra la información del servidor una vez cargada.
const ServerInfoDisplay = ({ server }) => {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = useCallback(() => {
        const ipAndPort = `${server.ip}:${server.port}`;
        navigator.clipboard.writeText(ipAndPort).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [server.ip, server.port]);
    const frameworkInfo = useMemo(() => {
        if (!server?.techList?.length) return 'N/D';
        const framework = server.techList.find(tech => tech.name.toLowerCase().includes('exiled'));
        return framework ? `${framework.name} v${framework.version}` : 'N/D';
    }, [server]);
    const processServerInfoString = (text = '') => text ? text.replace(/<color=([a-zA-Z]+|#[0-9a-fA-F]{6})>(.*?)<\/color>/g, '<span style="color:$1">$2</span>') : 'N/D';
    return (
        <motion.div className="bg-background-light rounded-lg p-6 sm:p-8 w-full max-w-2xl mx-auto shadow-lg border border-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center mb-6 gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${server.online ? 'bg-green-500 animate-glow' : 'bg-primary'}`}></div>
                <span className={`font-semibold text-lg ${server.online ? 'text-green-400' : 'text-primary'}`}>{server.online ? 'En línea' : 'Fuera de línea'}</span>
            </div>
            <div className="space-y-4">
                <div className="mb-4">
                    <p className="text-text text-sm font-mono uppercase tracking-wider">Nombre del Servidor</p>
                    <p className="font-mono text-text-light text-lg break-words" dangerouslySetInnerHTML={{ __html: processServerInfoString(server.info) }} />
                </div>
                <div className="mb-4">
                    <p className="text-text text-sm font-mono uppercase tracking-wider">Jugadores</p>
                    <p className="font-mono text-text-light text-lg">{server.players || 'N/D'}</p>
                </div>
                <div className="mb-4">
                    <p className="text-text text-sm font-mono uppercase tracking-wider">Framework</p>
                    <p className="font-mono text-text-light text-lg">{frameworkInfo}</p>
                </div>
            </div>
            <motion.button onClick={handleCopy} className={`btn w-full mt-6 ${isCopied ? 'bg-green-600' : 'bg-primary hover:bg-primary-hover'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={isCopied}>
                {isCopied ? <FaCheck size="1.2em" /> : <FaCopy size="1.2em" />}
                <span>{isCopied ? '¡IP Copiada!' : `Copiar IP: ${server.ip}:${server.port}`}</span>
            </motion.button>
        </motion.div>
    );
};

// Componente principal que orquesta los diferentes estados (configurado, cargando, error, resuelto).
const ServerInfo = () => {
    const { isConfigured, serverPromise } = useLoaderData();
    if (!isConfigured) {
        return <UnconfiguredServer />;
    }
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <motion.h1 className="font-black text-center mb-12 text-3xl sm:text-4xl md:text-5xl text-text-light" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                {serverInfoConfig.title}
            </motion.h1>
            <div className="flex justify-center items-center min-h-[300px]">
                <Suspense fallback={<ServerInfoSkeleton />}>
                    <Await resolve={serverPromise} errorElement={<p className="text-primary text-center">Error al cargar datos del servidor.</p>}>
                        {(server) => <ServerInfoDisplay server={server} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
};

export default ServerInfo;