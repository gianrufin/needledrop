import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [heading, setHeading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('GEOLOCATION UNSUPPORTED');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos.coords);
        setHeading(
          typeof pos.coords.heading === 'number' && !Number.isNaN(pos.coords.heading)
            ? pos.coords.heading
            : null,
        );
        setError(null);
      },
      (err) => {
        setError(err.message || 'GPS SIGNAL LOST');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 15000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, heading, error };
}
