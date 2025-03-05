import mixpanel from 'mixpanel-browser';

export const initAnalytics = () => {
  mixpanel.init('27a8b1d3cfe6a5f7e713cf254c1342dd', { debug: true });
};

export const trackEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, properties);
};

export const identifyUser = (userId) => {
  mixpanel.identify(userId);
};

export const trackPageView = (pageName) => {
  mixpanel.track('Page View', { page: pageName });
};