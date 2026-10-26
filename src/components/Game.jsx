import { useEffect, useRef, useState } from "react";

// Your Snake game from the previous portfolio: steer onto the 12 skill tiles to collect them.
const N = 16;
const LABELS = [
  "HTML",
  "CSS",
  "JS",
  "TS",
  "REACT",
  "GIT",
  "UX",
  "BS5",
  "PHP",
  "SQL",
  "PY",
  "FIGMA",
];
const COLORS = [null, "#2EC4A0", "#FF6B5B", "#7C5CFF"]; // null = use the accent colour
const MAP = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const KEYS = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  W: "up",
  S: "down",
  A: "left",
  D: "right",
};
const rand = (n) => Math.floor(Math.random() * n);

function readBest() {
  try {
    return Number(localStorage.getItem("gp-snake-best")) || 0;
  } catch {
    return 0;
  }
}
function saveBest(v) {
  try {
    localStorage.setItem("gp-snake-best", String(v));
  } catch {
    /* storage blocked */
  }
}

export default function Game() {
  const boardRef = useRef(null);
  const canvasRef = useRef(null);
  const api = useRef({ start: () => {} });
  const [ui, setUi] = useState({
    score: 0,
    best: readBest(),
    found: [],
    running: false,
    overlay: true,
    title: "Ready?",
    cta: "Start game",
    unlock: false,
  });

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    const board = boardRef.current;
    const CELL = cv.width / N;
    let snake = [];
    let dir = { x: 1, y: 0 };
    let queue = [];
    let tile = { x: 0, y: 0, label: "HTML", ci: 0 };
    let score = 0;
    let found = new Set();
    let running = false;
    let timer = 0;
    let speed = 150;
    let best = readBest();
    let ax = 0;
    let ay = 0;
    let touching = false;
    const STEP = 16;
    const sync = (patch) => setUi((u) => ({ ...u, ...patch }));
    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#FF4D2E";

    function placeTile() {
      let spot;
      do {
        spot = { x: rand(N), y: rand(N) };
      } while (snake.some((s) => s.x === spot.x && s.y === spot.y));
      const remaining = LABELS.filter((l) => !found.has(l));
      const pool = remaining.length ? remaining : LABELS;
      spot.label = pool[rand(pool.length)];
      spot.ci = rand(COLORS.length);
      tile = spot;
    }

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function draw() {
      ctx.fillStyle = "#2B2760";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "rgba(246,243,255,.08)";
      for (let gx = 0; gx < N; gx += 1) {
        for (let gy = 0; gy < N; gy += 1) {
          ctx.beginPath();
          ctx.arc(gx * CELL + CELL / 2, gy * CELL + CELL / 2, 2, 0, 6.283);
          ctx.fill();
        }
      }
      roundRect(tile.x * CELL + 2, tile.y * CELL + 2, CELL - 4, CELL - 4, 8);
      ctx.fillStyle = COLORS[tile.ci] || accent();
      ctx.fill();
      ctx.fillStyle = "#1E1B3F";
      ctx.font = `700 ${tile.label.length > 3 ? 10 : 12}px "Poppins", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        tile.label,
        tile.x * CELL + CELL / 2,
        tile.y * CELL + CELL / 2 + 1,
      );
      snake.forEach((s, i) => {
        roundRect(
          s.x * CELL + 2,
          s.y * CELL + 2,
          CELL - 4,
          CELL - 4,
          i === 0 ? 10 : 7,
        );
        ctx.fillStyle = i === 0 ? "#FF6B5B" : i % 2 ? accent() : "#F6F3FF";
        ctx.fill();
      });
    }

    function reset() {
      snake = [
        { x: 8, y: 8 },
        { x: 7, y: 8 },
        { x: 6, y: 8 },
      ];
      dir = { x: 1, y: 0 };
      queue = [];
      score = 0;
      found = new Set();
      speed = 150;
      placeTile();
      draw();
      sync({ score: 0, found: [], unlock: false });
    }

    function setDir(name) {
      const d = MAP[name];
      const last = queue.length ? queue[queue.length - 1] : dir;
      if (d.x === -last.x && d.y === -last.y) return; // no instant 180-degree turn
      if (queue.length < 3) queue.push(d);
    }

    function stop() {
      running = false;
      clearTimeout(timer);
    }

    function gameOver() {
      stop();
      if (score > best) {
        best = score;
        saveBest(best);
      }
      sync({
        best,
        running: false,
        overlay: true,
        title:
          found.size === LABELS.length
            ? "All skills collected!"
            : `Game over. Score ${score}`,
        cta: "Play again",
      });
    }

    function tick() {
      if (queue.length) dir = queue.shift();
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= N || head.y >= N;
      const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        gameOver();
        return;
      }
      snake.unshift(head);
      if (head.x === tile.x && head.y === tile.y) {
        score += 10;
        if (!found.has(tile.label)) found.add(tile.label);
        speed = Math.max(80, speed - 3);
        placeTile();
        sync({
          score,
          found: [...found],
          unlock: found.size === LABELS.length,
        });
      } else {
        snake.pop();
      }
      draw();
      timer = setTimeout(tick, speed);
    }

    function start() {
      reset();
      running = true;
      sync({ running: true, overlay: false });
      clearTimeout(timer);
      timer = setTimeout(tick, speed);
    }
    api.current.start = start;

    const onKey = (e) => {
      const name = KEYS[e.key];
      if (!running || !name) return;
      if (/^(input|textarea|select)$/i.test(e.target.tagName)) return;
      e.preventDefault();
      setDir(name);
    };
    const onTouchStart = (e) => {
      const t = e.touches[0];
      ax = t.clientX;
      ay = t.clientY;
      touching = true;
    };
    const onTouchMove = (e) => {
      if (!touching || !running) return;
      const t = e.touches[0];
      const dx = t.clientX - ax;
      const dy = t.clientY - ay;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < STEP) return;
      setDir(
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? "right"
            : "left"
          : dy > 0
            ? "down"
            : "up",
      );
      ax = t.clientX;
      ay = t.clientY;
    };
    const onTouchEnd = () => {
      touching = false;
    };
    const onAccent = () => {
      if (!running) draw();
    };

    document.addEventListener("keydown", onKey);
    board.addEventListener("touchstart", onTouchStart, { passive: true });
    board.addEventListener("touchmove", onTouchMove, { passive: true });
    board.addEventListener("touchend", onTouchEnd, { passive: true });
    board.addEventListener("touchcancel", onTouchEnd, { passive: true });
    document.addEventListener("accentchange", onAccent);

    // Pause and show "Restart" when the board scrolls out of view.
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting && running) {
          stop();
          sync({
            running: false,
            overlay: true,
            title: "Paused",
            cta: "Restart",
          });
        }
      },
      { threshold: 0.1 },
    );
    io.observe(cv);

    reset();
    setUi((u) => ({ ...u, best }));

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("keydown", onKey);
      board.removeEventListener("touchstart", onTouchStart);
      board.removeEventListener("touchmove", onTouchMove);
      board.removeEventListener("touchend", onTouchEnd);
      board.removeEventListener("touchcancel", onTouchEnd);
      document.removeEventListener("accentchange", onAccent);
    };
  }, []);

  return (
    <div className="snake">
      <div className="snake-hud">
        <div>
          <span>Score</span>
          <strong>{ui.score}</strong>
        </div>
        <div>
          <span>Best</span>
          <strong>{ui.best}</strong>
        </div>
        <div>
          <span>Skills</span>
          <strong>{ui.found.length}/12</strong>
        </div>
      </div>

      <ul className="skill-list" aria-label="Skills collected so far">
        {ui.found.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      {ui.unlock && (
        <p className="skill-unlock">
          You collected every skill. Imagine what we could build together.{" "}
          <a href="#contact">Say hello</a>.
        </p>
      )}

      <div ref={boardRef} className="snake-board">
        <canvas
          ref={canvasRef}
          width="512"
          height="512"
          role="img"
          aria-label="Snake game board"
        />
        {ui.overlay && (
          <div className="snake-overlay">
            <h3>{ui.title}</h3>
            <button
              type="button"
              className="snake-btn primary"
              onClick={() => api.current.start()}
            >
              {ui.cta}
            </button>
          </div>
        )}
      </div>

      <p className="snake-keys">
        On a phone, swipe on the board. On a keyboard, use the arrow keys or{" "}
        <kbd>W</kbd>
        <kbd>A</kbd>
        <kbd>S</kbd>
        <kbd>D</kbd>.
      </p>
    </div>
  );
}
