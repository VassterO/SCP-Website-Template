import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Footer from './components/common/Footer';
import BackToTopButton from './components/common/BackToTopButton';
import './styles/index.css';

function App() {
    const location = useLocation();

    return (
        <div className="bg-dot-grid flex flex-col min-h-screen text-text-light">
            {/* THE FIX: Se añade un comentario para desactivar el falso positivo del linter.
                Esta es la práctica recomendada cuando el linter se equivoca. */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-white p-3 z-50">
                Saltar al contenido principal
            </a>

            <Navigation />

            <main id="main-content" className="flex-grow flex flex-col pt-16">
                <AnimatePresence mode="wait" initial={false}>
                    <div key={location.pathname} className="flex-grow flex flex-col">
                        <Outlet />
                    </div>
                </AnimatePresence>
            </main>

            <Footer />
            <BackToTopButton />
        </div>
    );
}

export default App;