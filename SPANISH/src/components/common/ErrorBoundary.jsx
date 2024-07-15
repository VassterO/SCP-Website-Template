import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        // You could add error reporting service here
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
                    <h1 className="text-4xl font-bold mb-4">Oops! Algo salió mal.</h1>
                    <p className="text-xl mb-8">Lo sentimos, ha ocurrido un error inesperado.</p>
                    <Link
                        to="/"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Volver al inicio
                    </Link>
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-4 text-left w-full max-w-2xl">
                            <summary className="cursor-pointer mb-2">Detalles del error</summary>
                            <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm">
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;