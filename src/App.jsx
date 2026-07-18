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
  const [vaultOpen, setVaultOpen] = useState(false);

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

  function handleDrop(label, level) {
    if (!position) return;
    dropNeedle(label, position, level);
  }

  function handleEngage(id) {
    engageNeedle(id);
    setVaultOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-hud-bg text-white">
      <Header online={online} gpsError={gpsError} />

      {!vaultOpen && (
        <main className="flex flex-1 flex-col pb-32">
          {gpsError && (
            <p className="mx-auto mt-2 max-w-sm text-center text-xs text-hud-warn">
              GPS warning: {gpsError}
            </p>
          )}

          <RadarDisplay
            activeNeedle={activeNeedle}
            position={position}
            heading={heading}
            distance={distance}
            bearing={bearing}
          />

          <div className="pb-2">
            <ControlCenter onDrop={handleDrop} disabled={!position} />
          </div>
        </main>
      )}

      <NeedleVault
        needles={needles}
        activeId={activeNeedle?.id}
        open={vaultOpen}
        onToggle={() => setVaultOpen((o) => !o)}
        onEngage={handleEngage}
        onDelete={deleteNeedle}
      />
    </div>
  );
}

export default App;
