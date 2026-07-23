/// <reference types="vite/client" />

// Swiper ships CSS at extensionless subpaths that the default *.css glob
// doesn't match — declare them so side-effect imports type-check.
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
