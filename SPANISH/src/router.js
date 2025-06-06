import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './features/home/Home';
import Donations from './features/donations/Donations';
import Rules from './features/rules/Rules';
import NotFound from './pages/NotFound';
import RouteError from './components/common/RouteError';

import ServerInfo, { loader as serverInfoLoader } from './features/serverInfo/ServerInfo';

export const router = createBrowserRouter([
    {
        path: '/',
        // 'App' actúa como el layout principal (shell) para todas las rutas hijas.
        element: <App />,
        // Este es el componente que se mostrará si hay un error en la carga de datos o en el renderizado.
        errorElement: <RouteError />,
        children: [
            {
                index: true, // Esta es la ruta por defecto que se renderiza en '/'.
                element: <Home />,
            },
            {
                path: 'servidor',
                element: <ServerInfo />,
                // El 'loader' obtiene los datos de la API ANTES de que el componente se renderice.
                loader: serverInfoLoader,
            },
            {
                path: 'donaciones',
                element: <Donations />,
            },
            {
                path: 'normativas',
                element: <Rules />,
            },
            {
                // Ruta 'catch-all' para cualquier URL no encontrada (404).
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);