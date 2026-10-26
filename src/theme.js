// Design tokens, mirrored into CSS variables on :root.
export const ACCENTS = [
  { name: 'Signal red', value: '#FF4D2E' },
  { name: 'Acid lime', value: '#C6F432' },
  { name: 'Ultramarine', value: '#4B5BFF' },
  { name: 'Mint', value: '#2FD6A4' },
];

const NAVY = { '--bg': '#1E1B3F', '--surface': '#2B2760', '--ink': '#F6F3FF', '--muted': '#B9B3E6', '--line': 'rgba(246,243,255,0.2)' };
export const THEMES = { light: NAVY, dark: NAVY };

export function applyTheme(mode, accent) {
  const root = document.documentElement;
  Object.entries({ ...THEMES[mode], '--accent': accent }).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.theme = mode;
}
