import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import RadarDisplay from './components/RadarDisplay';
import ControlCenter from './components/ControlCenter';
import NeedleVault from './components/NeedleVault';
import { useGeolocation } from './hooks/useGeolocation';
import { useNeedles } from './hooks/useNeedles';
import { calculateBearing, haversineDistance } from './utils/geo';

function App() {
  const { position, heading, error: gpsError } = useGeolocation();
  const { needles, activeNeedle, dropNeedle, deleteNeedle, engageNeedle } = useNeedles();
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const { distance, bearing } = useMemo(() => {
    if (!position || !activeNeedle) return { distance: null, bearing: null };
    return {
      distance: haversineDistance(
        position.latitude,
        position.longitude,
        activeNeedle.lat,
        activeNeedle.lon,
      ),
      bearing: calculateBearing(
        position.latitude,
        position.longitude,
        activeNeedle.lat,
        activeNeedle.lon,
      ),
    };
  }, [position, activeNeedle]);

  function handleDrop(label) {
    if (!position) return;
    dropNeedle(label, position);
  }

  return (
    <div className="hud-scanlines flex min-h-screen flex-col bg-hud-bg text-hud-green">
      <Header online={online} gpsError={gpsError} />

      <main className="flex flex-1 flex-col justify-center gap-8 px-4 pb-24 pt-6">
        {gpsError && (
          <p className="mx-auto max-w-sm text-center text-[10px] tracking-widest text-hud-amber">
            [ GPS WARNING: {gpsError.toUpperCase()} ]
          </p>
        )}

        <RadarDisplay
          activeNeedle={activeNeedle}
          position={position}
          heading={heading}
          distance={distance}
          bearing={bearing}
        />

        <div className="mx-auto w-full max-w-sm">
          <ControlCenter onDrop={handleDrop} disabled={!position} />
        </div>
      </main>

      <NeedleVault
        needles={needles}
        activeId={activeNeedle?.id}
        onEngage={engageNeedle}
        onDelete={deleteNeedle}
      />
    </div>
  );
}

export default App;
