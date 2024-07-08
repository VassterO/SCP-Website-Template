import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';  // Note the capital 'S' in 'styles'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);