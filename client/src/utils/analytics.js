import { trackAnalyticsEvent } from '../services/api';

const getVisitorId = () => {
  let id = localStorage.getItem('nn_visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    try {
      localStorage.setItem('nn_visitor_id', id);
    } catch {
      // ignore
    }
  }
  return id;
};

const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 640) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
};

export const logEvent = (eventType, target = '') => {
  try {
    const payload = {
      eventType,
      target,
      visitorId: getVisitorId(),
      path: window.location.pathname,
      deviceType: getDeviceType(),
      referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct',
    };

    trackAnalyticsEvent(payload).catch(() => {
      // Non-blocking silent fallback
    });
  } catch {
    // Non-blocking
  }
};
