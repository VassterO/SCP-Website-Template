import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useScreenAdapter } from './utils/ScreenAdapter';
import Navigation from './components/layout/Navigation';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './styles/index.css';

const Home = lazy(() => import('./features/home/Home'));
const ServerInfo = lazy(() => import('./features/serverInfo/ServerInfo'));
const Donations = lazy(() => import('./features/donations/Donations'));
const Rules = lazy(() => import('./features/rules/Rules'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/server" element={<ServerInfo />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}

function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.button
            className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            ↑
        </motion.button>
    );
}

function App() {
    const { adaptSpacing } = useScreenAdapter();

    const mainStyle = { paddingTop: adaptSpacing(64) };

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-red-500 text-white p-2 z-50">Skip to main content</a>
                <Navigation className="fixed top-0 left-0 right-0 z-40" />
                <main id="main-content" className="flex-grow flex flex-col pt-16" style={mainStyle}>
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner className="flex-grow flex items-center justify-center" />}>
                            <AnimatedRoutes />
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
                <BackToTopButton />
            </div>
        </BrowserRouter>
    );
}

export default App;