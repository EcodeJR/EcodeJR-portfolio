import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from '../utils/analytics';

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Track pageview on location change
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search,
            title: document.title || 'Portfolio'
        });
    }, [location]);

    return null; // This component doesn't render anything
};

export default AnalyticsTracker;
