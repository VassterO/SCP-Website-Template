import { navigationConfig } from '../config/navigationConfig';
import { donationConfig } from '../config/donationConfig';

export function debounce(func, wait = 300) {
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

export function getRoutePath(itemName) {
    return itemName.toLowerCase() === 'inicio' ? '/' : `/${itemName.toLowerCase().replace(/\s+/g, '-')}`;
}

export function formatPlayerCount(playerString) {
    if (!playerString) return 'N/A';
    const [current, max] = playerString.split('/').map(Number);
    return `${current}/${max}`;
}

export function formatServerStatus(isOnline) {
    return isOnline ? 'Online' : 'Offline';
}

export function formatFriendlyFire(isFriendlyFire) {
    return isFriendlyFire ? 'Activado' : 'Desactivado';
}

export function formatFrameworkInfo(techList) {
    if (!Array.isArray(techList) || techList.length === 0) return 'Information not available';
    return techList.map(tech => `${tech.name} v${tech.version}`).join(', ');
}

export function getNavigationItems() {
    return navigationConfig.menuItems.map(item => ({
        name: item,
        path: getRoutePath(item)
    }));
}

export function formatPrice(price) {
    return `${price.toFixed(2)}€`;
}

export function createPayPalDonationUrl(amount, tierName) {
    const { paypalEmail, currency, serverName } = donationConfig;
    const params = new URLSearchParams({
        cmd: '_xclick',
        business: paypalEmail,
        item_name: `${tierName} - ${serverName}`,
        currency_code: currency,
        amount: amount.toFixed(2)
    });
    return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function getContrastColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for bright colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}