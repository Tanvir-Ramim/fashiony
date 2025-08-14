// analytics.js
import ReactGA from "react-ga4"; // Adjust import based on your setup

// Custom function to track events
const trackEvent = (category, action, value) => {
  ReactGA.event({ category, action, label: action, value });
};

export { trackEvent };
