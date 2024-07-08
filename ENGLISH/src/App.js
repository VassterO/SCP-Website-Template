import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useScreenAdapter } from './utils/ScreenAdapter';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './styles/index.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const ServerInfo = lazy(() => import('./pages/ServerInfo'));
const Donations = lazy(() => import('./pages/Donations'));
const Rules = lazy(() => import('./pages/Rules'));

function App() {
    const { adaptContainerWidth, adaptSpacing } = useScreenAdapter();

    const mainStyle = {
        paddingTop: adaptSpacing(64),
        maxWidth: adaptContainerWidth(),
        margin: '0 auto',
        width: '100%'
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white">
                <Navigation />
                <main className="flex-grow" style={mainStyle}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/server" element={<ServerInfo />} />
                            <Route path="/donations" element={<Donations />} />
                            <Route path="/rules" element={<Rules />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;