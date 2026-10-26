import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReduced } from "../hooks";

// Kinetic name intro. Shows on every page load; a click or tap skips it.
const WORD = "GURWINDER";

export default function Intro() {
  const reduce = useReduced();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return undefined;
    if (reduce) {
      setShow(false);
      return undefined;
    }
    const t = setTimeout(() => setShow(false), 2600);
    const skip = () => setShow(false);
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", skip);
    };
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="intro"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-word">
            {WORD.split("").map((ch, i) => (
              <span className="intro-mask" key={i}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%", rotate: 14 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="intro-dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.2,
                type: "spring",
                stiffness: 320,
                damping: 14,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
