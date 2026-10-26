import { createContext, useContext, useEffect, useState } from 'react';
import { ACCENTS, applyTheme } from './theme';

// Visitor preferences (theme, accent colour, plain-English mode), saved per browser.
const PrefsContext = createContext(null);

function read(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback; // storage can be blocked; fall back to defaults
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore: preferences just won't persist */
  }
}

export function PrefsProvider({ children }) {
  const [mode, setMode] = useState(() => read('gp-mode', 'light'));
  const [accent, setAccent] = useState(() => read('gp-accent', ACCENTS[0].value));
  const [plain, setPlain] = useState(() => read('gp-plain', '0') === '1');

  useEffect(() => {
    applyTheme(mode, accent);
    write('gp-mode', mode);
    write('gp-accent', accent);
  }, [mode, accent]);

  useEffect(() => {
    write('gp-plain', plain ? '1' : '0');
  }, [plain]);

  return (
    <PrefsContext.Provider value={{ mode, setMode, accent, setAccent, plain, setPlain }}>
      {children}
    </PrefsContext.Provider>
  );
}

export const usePrefs = () => useContext(PrefsContext);
