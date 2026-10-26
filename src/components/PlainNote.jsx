import { usePrefs } from '../context';

// Shows a plain-English explanation only when "Plain words" mode is on.
export default function PlainNote({ children, className = '' }) {
  const { plain } = usePrefs();
  if (!plain) return null;
  return (
    <p className={`plain-note ${className}`}>
      <strong>In plain words: </strong>
      {children}
    </p>
  );
}
