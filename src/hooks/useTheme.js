import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'needledrop.theme';
const MODES = ['light', 'dark', 'auto'];

const THEME_COLORS = { light: '#f0eee2', dark: '#141a26' };

function loadMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(stored) ? stored : 'auto';
  } catch {
    return 'auto';
  }
}

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyResolvedTheme(resolved) {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[resolved]);
}

export function useTheme() {
  const [mode, setModeState] = useState(loadMode);

  const resolvedTheme = mode === 'auto' ? (systemPrefersDark() ? 'dark' : 'light') : mode;

  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (mode !== 'auto') return undefined;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyResolvedTheme(systemPrefersDark() ? 'dark' : 'light');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode]);

  const setMode = useCallback((next) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — theme choice just won't persist
    }
  }, []);

  const cycleMode = useCallback(() => {
    setMode(MODES[(MODES.indexOf(mode) + 1) % MODES.length]);
  }, [mode, setMode]);

  return { mode, resolvedTheme, setMode, cycleMode };
}
