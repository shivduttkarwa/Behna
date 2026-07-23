import { useEffect, useState } from 'react';

export interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (n: number) => Math.max(0, n).toString().padStart(2, '0');

function compute(target: number): Countdown {
  const distance = target - Date.now();
  if (distance < 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  return {
    days: pad(Math.floor(distance / (1000 * 60 * 60 * 24))),
    hours: pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: pad(Math.floor((distance % (1000 * 60)) / 1000)),
  };
}

/** Ticking countdown that ends `hoursAhead` hours from mount (default 24h). */
export function useCountdown(hoursAhead = 24): Countdown {
  const [target] = useState(() => Date.now() + hoursAhead * 60 * 60 * 1000);
  const [time, setTime] = useState<Countdown>(() => compute(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}
