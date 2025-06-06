import { navigationConfig } from '../config/navigationConfig';
import { donationConfig } from '../config/donationConfig';

/**
 * Retrasa la ejecución de una función. Es útil para limitar la frecuencia
 * con la que se llama a un evento (ej. al cambiar el tamaño de la ventana).
 */
export function debounce(func, wait = 200) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Genera los elementos de navegación basados en la configuración,
 * asignando las rutas correctas a cada uno.
 */
export function getNavigationItems() {
    const pathMap = {
        'Inicio': '/',
        'Servidor': '/servidor',
        'Donaciones': '/donaciones',
        'Normativas': '/normativas'
    };

    return navigationConfig.menuItems.map(item => ({
        name: item,
        path: pathMap[item] || '/'
    }));
}

/**
 * Crea una URL de donación de PayPal con los detalles pre-rellenados.
 */
export function createPayPalDonationUrl(amount, tierName) {
    const { paypalEmail, currency, serverName } = donationConfig;
    const params = new URLSearchParams({
        cmd: '_donations', // Usar '_donations' para una intención más clara
        business: paypalEmail,
        item_name: `Donación para ${serverName}: ${tierName}`,
        amount: amount.toFixed(2),
        currency_code: currency,
        no_shipping: '1',
        return: window.location.origin,
        cancel_return: window.location.href,
    });
    return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}