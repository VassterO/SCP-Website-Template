import { useState, useEffect, useMemo, useCallback } from 'react';

const BREAKPOINTS = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

const getScreenSize = (width) => {
    return Object.entries(BREAKPOINTS).reduce((acc, [size, breakpoint]) => {
        return width >= breakpoint ? size : acc;
    }, 'xs');
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

export const useScreenAdapter = () => {
    const [screenDimensions, setScreenDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    const handleResize = useCallback(throttle(() => {
        setScreenDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, 200), []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const screenSize = useMemo(() => getScreenSize(screenDimensions.width), [screenDimensions.width]);
    const aspectRatio = useMemo(() => screenDimensions.width / screenDimensions.height, [screenDimensions]);
    const isPortrait = useMemo(() => aspectRatio < 1, [aspectRatio]);

    const adaptValue = useCallback((baseValue, minValue, maxValue) => {
        const scaleFactor = Math.min(screenDimensions.width / 1920, screenDimensions.height / 1080);
        return Math.max(minValue, Math.min(maxValue, Math.round(baseValue * scaleFactor)));
    }, [screenDimensions]);

    const adaptFontSize = useCallback((baseSizePx, minSizePx = 12, maxSizePx = 48) => {
        return `${adaptValue(baseSizePx, minSizePx, maxSizePx)}px`;
    }, [adaptValue]);

    const adaptSpacing = useCallback((baseSpacingPx, minSpacingPx = 4, maxSpacingPx = 120) => {
        return `${adaptValue(baseSpacingPx, minSpacingPx, maxSpacingPx)}px`;
    }, [adaptValue]);

    const adaptContainerWidth = useCallback(() => {
        const widths = {
            xs: '100%',
            sm: '95%',
            md: '90%',
            lg: '85%',
            xl: '80%',
            '2xl': '75%'
        };
        return widths[screenSize] || '100%';
    }, [screenSize]);

    const getBreakpoint = useCallback((size) => BREAKPOINTS[size], []);

    const isMobile = useMemo(() => ['xs', 'sm', 'md'].includes(screenSize), [screenSize]);

    const isBreakpoint = useCallback((breakpoint) => {
        return screenDimensions.width >= BREAKPOINTS[breakpoint];
    }, [screenDimensions.width]);

    const adaptFlexDirection = useCallback(() => {
        return isPortrait ? 'column' : 'row';
    }, [isPortrait]);

    const adaptGridColumns = useCallback((baseColumns) => {
        if (screenSize === 'xs') return 1;
        if (screenSize === 'sm') return Math.min(2, baseColumns);
        if (screenSize === 'md') return Math.min(3, baseColumns);
        return baseColumns;
    }, [screenSize]);

    return {
        screenSize,
        dimensions: screenDimensions,
        aspectRatio,
        isPortrait,
        isMobile,
        adaptFontSize,
        adaptSpacing,
        adaptContainerWidth,
        getBreakpoint,
        isBreakpoint,
        adaptFlexDirection,
        adaptGridColumns,
    };
};