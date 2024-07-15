import { useState, useEffect, useMemo, useCallback } from 'react';
import { debounce } from './helpers';

const BREAKPOINTS = { xs: 480, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536, '3xl': 1920 };

function getScreenSize(width) {
    return Object.entries(BREAKPOINTS).reduce((acc, [size, breakpoint]) => width >= breakpoint ? size : acc, 'xs');
}

export function useScreenAdapter() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        }, 200);

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const screenSize = useMemo(() => getScreenSize(dimensions.width), [dimensions.width]);
    const aspectRatio = useMemo(() => dimensions.width / dimensions.height, [dimensions]);
    const isPortrait = useMemo(() => aspectRatio < 1, [aspectRatio]);
    const isMobile = useMemo(() => ['xs', 'sm', 'md'].includes(screenSize), [screenSize]);

    const adaptValue = useCallback((baseValue, minValue, maxValue) => {
        const scaleFactor = Math.min(dimensions.width / 1920, dimensions.height / 1080);
        return Math.max(minValue, Math.min(maxValue, Math.round(baseValue * scaleFactor)));
    }, [dimensions]);

    const adaptFontSize = useCallback((baseSizePx, minSizePx = 12, maxSizePx = 48) =>
        `${adaptValue(baseSizePx, minSizePx, maxSizePx)}px`, [adaptValue]);

    const adaptSpacing = useCallback((baseSpacingPx, minSpacingPx = 4, maxSpacingPx = 120) =>
        `${adaptValue(baseSpacingPx, minSpacingPx, maxSpacingPx)}px`, [adaptValue]);

    const adaptContainerWidth = useMemo(() => ({
        xs: '100%', sm: '95%', md: '90%', lg: '85%', xl: '80%', '2xl': '75%', '3xl': '70%'
    })[screenSize] || '100%', [screenSize]);

    const isBreakpoint = useCallback((breakpoint) => dimensions.width >= BREAKPOINTS[breakpoint], [dimensions.width]);

    const adaptGridColumns = useCallback((baseColumns) =>
            Math.min(baseColumns, screenSize === 'xs' ? 1 : screenSize === 'sm' ? 2 : screenSize === 'md' ? 3 : baseColumns),
        [screenSize]);

    return {
        screenSize,
        dimensions,
        aspectRatio,
        isPortrait,
        isMobile,
        adaptFontSize,
        adaptSpacing,
        adaptContainerWidth,
        isBreakpoint,
        adaptFlexDirection: () => isPortrait ? 'column' : 'row',
        adaptGridColumns,
        getBreakpoint: (size) => BREAKPOINTS[size]
    };
}