import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'needledrop.needles';
const ACTIVE_KEY = 'needledrop.activeNeedleId';

function loadNeedles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadActiveId() {
  try {
    return localStorage.getItem(ACTIVE_KEY) || null;
  } catch {
    return null;
  }
}

export function useNeedles() {
  const [needles, setNeedles] = useState(loadNeedles);
  const [activeId, setActiveId] = useState(loadActiveId);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(needles));
  }, [needles]);

  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_KEY, activeId);
    } else {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }, [activeId]);

  const dropNeedle = useCallback((label, coords) => {
    const needle = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      label: label?.trim() || new Date().toLocaleString(),
      lat: coords.latitude,
      lon: coords.longitude,
      createdAt: Date.now(),
    };
    setNeedles((prev) => [needle, ...prev]);
    setActiveId(needle.id);
    return needle;
  }, []);

  const deleteNeedle = useCallback((id) => {
    setNeedles((prev) => prev.filter((n) => n.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const engageNeedle = useCallback((id) => {
    setActiveId(id);
  }, []);

  const activeNeedle = needles.find((n) => n.id === activeId) || null;

  return { needles, activeNeedle, dropNeedle, deleteNeedle, engageNeedle };
}
