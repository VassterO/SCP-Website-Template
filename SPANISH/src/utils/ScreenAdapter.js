// DO NOT TOUCH

import { useState, useEffect, useMemo } from 'react';

// Define screen size breakpoints
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

// Determine the current screen size based on width
const getScreenSize = (width) => {
    return Object.entries(BREAKPOINTS).reduce((acc, [size, breakpoint]) => {
        return width >= breakpoint ? size : acc;
    }, 'sm');
};

export const useScreenAdapter = () => {
    // Store current screen dimensions
    const [screenDimensions, setScreenDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    // Update dimensions on window resize
    useEffect(() => {
        const handleResize = () => {
            setScreenDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Derived values
    const screenSize = useMemo(() => getScreenSize(screenDimensions.width), [screenDimensions.width]);
    const aspectRatio = useMemo(() => screenDimensions.width / screenDimensions.height, [screenDimensions]);
    const isPortrait = useMemo(() => aspectRatio < 1, [aspectRatio]);

    // Adjust a value based on screen size
    const adaptValue = (baseValue, minValue, maxValue) => {
        const scaleFactor = Math.min(screenDimensions.width / 1920, screenDimensions.height / 1080);
        return Math.max(minValue, Math.min(maxValue, Math.round(baseValue * scaleFactor)));
    };

    // Adapt font size
    const adaptFontSize = (baseSizePx, minSizePx = 12, maxSizePx = 48) => {
        return `${adaptValue(baseSizePx, minSizePx, maxSizePx)}px`;
    };

    // Adapt spacing
    const adaptSpacing = (baseSpacingPx, minSpacingPx = 4, maxSpacingPx = 120) => {
        return `${adaptValue(baseSpacingPx, minSpacingPx, maxSpacingPx)}px`;
    };

    // Adapt container width based on screen size
    const adaptContainerWidth = () => {
        const widths = {
            sm: '95%',
            md: '90%',
            lg: '85%',
            xl: '80%',
            '2xl': '75%'
        };
        return widths[screenSize] || '100%';
    };

    // Get breakpoint value
    const getBreakpoint = (size) => BREAKPOINTS[size];

    // Check if current screen size is considered mobile
    const isMobile = screenSize === 'sm' || screenSize === 'md';

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
    };
};