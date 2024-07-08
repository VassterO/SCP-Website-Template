import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServerInfo from './pages/ServerInfo';
import Donations from './pages/Donations';
import Rules from './pages/Rules';
import { useScreenAdapter } from './utils/ScreenAdapter';
import './styles/index.css';

function App() {
    const { adaptContainerWidth, adaptSpacing } = useScreenAdapter();

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white">
                <Navigation />
                <main className="flex-grow" style={{
                    paddingTop: adaptSpacing(64),
                    maxWidth: adaptContainerWidth(),
                    margin: '0 auto',
                    width: '100%'
                }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/servidor" element={<ServerInfo />} />
                        <Route path="/donaciones" element={<Donations />} />
                        <Route path="/normativas" element={<Rules />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;