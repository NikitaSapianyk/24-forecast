import { useState, useEffect } from "react";
import { formatCardTime, getCityNowTimestamp } from "../utils/date";

export function useCityClock(timezoneOffset = 0) {
  const [time, setTime] = useState(() =>
    formatCardTime(getCityNowTimestamp(), timezoneOffset)
  );

  useEffect(() => {
    const tick = () => {
      setTime(formatCardTime(getCityNowTimestamp(), timezoneOffset));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezoneOffset]);

  return time;
}
