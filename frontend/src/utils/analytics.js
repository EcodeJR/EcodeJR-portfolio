import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
    if (GA_ID) {
        ReactGA.initialize(GA_ID);
        console.log('GA4 Initialized');
    } else {
        console.warn('VITE_GA_MEASUREMENT_ID not found. Analytics disabled.');
    }
};

export const trackEvent = (category, action, label) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};

export default ReactGA;
