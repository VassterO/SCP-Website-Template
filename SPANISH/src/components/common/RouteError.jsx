import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const RouteError = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
            <h1 className="text-6xl sm:text-8xl font-black mb-4 text-primary">{error.status || 'Error'}</h1>
            <p className="text-lg sm:text-xl font-bold mb-2 text-text-light">¡Ups! Algo salió mal.</p>
            <p className="text-base sm:text-lg text-text mb-8">
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="btn-primary">
                Volver al Inicio
            </Link>
        </div>
    );
};

export default RouteError;