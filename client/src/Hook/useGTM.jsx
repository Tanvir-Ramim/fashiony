import { useEffect } from "react";

const useGTM = (eventName, eventData) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }, [eventName, eventData]);
};

export default useGTM;
