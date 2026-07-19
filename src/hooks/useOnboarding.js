import { useCallback, useState } from 'react';

const STORAGE_KEY = 'needledrop.onboarded';

function loadCompleted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function useOnboarding() {
  const [completed, setCompleted] = useState(loadCompleted);

  const complete = useCallback(() => {
    setCompleted(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage unavailable — onboarding will just reappear next visit
    }
  }, []);

  return { completed, complete };
}
