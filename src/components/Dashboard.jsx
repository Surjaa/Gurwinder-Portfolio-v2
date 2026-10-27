import { useEffect, useState } from "react";
import { getStats } from "../api";

// The password is kept for this browser tab only (sessionStorage) and is checked by the Apps Script backend.
const TOKEN_KEY = "pf_admin_token";
const readToken = () => {
  try { return sessionStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; }
};
const saveToken = (t) => {
  try { sessionStorage.setItem(TOKEN_KEY, t); } catch { /* storage blocked: works until refresh */ }
};
const clearToken = () => {
  try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
};

const card = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 16,
  padding: 20,
  minWidth: 0,
};
const label = { fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.6 };
const input = {
  width: "100%",
  background: "var(--bg)",
  color: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 15,
};

function Shell({ children }) {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)", padding: "24px 16px", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </main>
  );
}

function Kpi({ title, value }) {
  return (
    <div style={card}>
      <div style={label}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--font-display)", marginTop: 6 }}>{value}</div>
    </div>
  );
}

function DailyChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.visits));
  const w = 600, h = 170, gap = 4;
  const bw = (w - gap * data.length) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} width="100%" role="img" aria-label="Visits per day for the last 30 days">
      {data.map((d, i) => {
        const bh = (d.visits / max) * h;
        const x = i * (bw + gap);
        return (
          <g key={`${d.label}-${i}`}>
            <rect x={x} y={h - bh} width={bw} height={bh} rx="3" fill="var(--accent)">
              <title>{`${d.label}: ${d.visits} visits`}</title>
            </rect>
            {i % 5 === 0 && (
              <text x={x} y={h + 16} fontSize="11" fill="currentColor" opacity="0.6">{d.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function BarList({ items }) {
  if (!items.length) return <p style={{ opacity: 0.6, margin: 0 }}>No data yet</p>;
  const max = Math.max(...items.map((i) => i.count));
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((i) => (
        <div key={i.name}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, gap: 8 }}>
            <span style={{ overflowWrap: "anywhere" }}>{i.name}</span>
            <b>{i.count}</b>
          </div>
          <div style={{ height: 8, background: "var(--bg)", borderRadius: 99, overflow: "hidden", marginTop: 4 }}>
            <div style={{ width: `${(i.count / max) * 100}%`, height: "100%", background: "var(--accent)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr>{head.map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 10px", borderBottom: "1px solid var(--line)", whiteSpace: "nowrap", opacity: 0.7 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: "8px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top", overflowWrap: "anywhere" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  const [token, setToken] = useState(readToken);
  const [pass, setPass] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (t) => {
    setLoading(true);
    setError("");
    try {
      const res = await getStats(t);
      if (!res.ok) throw new Error(res.error || "Could not load the dashboard.");
      setData(res);
    } catch (err) {
      if (err.message === "Unauthorized") {
        clearToken();
        setToken("");
        setError("Wrong password.");
      } else {
        setError(err.message || "Could not load the dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const lock = () => {
    clearToken();
    setToken("");
    setData(null);
    setPass("");
  };

  if (!token) {
    return (
      <Shell>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const t = pass.trim();
            if (!t) return;
            saveToken(t);
            setToken(t);
          }}
          style={{ ...card, maxWidth: 420, margin: "12vh auto 0", display: "grid", gap: 14 }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Owner dashboard</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Dashboard password"
            autoComplete="current-password"
            style={input}
          />
          <button type="submit" className="btn-pill">Open dashboard</button>
          {error && <p role="alert" style={{ color: "var(--accent)", margin: 0 }}>{error}</p>}
          <a href="./" style={{ fontSize: 14, opacity: 0.7 }}>← Back to site</a>
        </form>
      </Shell>
    );
  }

  return (
    <Shell>
      <header style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, fontFamily: "var(--font-display)" }}>Portfolio dashboard</h1>
          <div style={{ fontSize: 13, opacity: 0.6 }}>{data ? `Updated ${data.generatedAt}` : "Loading..."}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn-pill ghost" onClick={() => load(token)} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button type="button" className="btn-pill ghost" onClick={lock}>Lock</button>
        </div>
      </header>

      {error && <p role="alert" style={{ color: "var(--accent)" }}>{error}</p>}

      {data && (
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            <Kpi title="Total visits" value={data.totals.visits} />
            <Kpi title="Unique visitors" value={data.totals.uniqueVisitors} />
            <Kpi title="Today" value={data.totals.today} />
            <Kpi title="Last 7 days" value={data.totals.last7Days} />
            <Kpi title="Exact locations" value={data.totals.exactLocations} />
            <Kpi title="Messages" value={data.totals.messages} />
            <Kpi title="AI questions" value={data.totals.aiQuestions} />
          </div>

          <div style={card}>
            <div style={{ ...label, marginBottom: 12 }}>Visits per day (last 30 days)</div>
            <DailyChart data={data.daily} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <div style={card}>
              <div style={{ ...label, marginBottom: 12 }}>Devices</div>
              <BarList items={data.devices} />
            </div>
            <div style={card}>
              <div style={{ ...label, marginBottom: 12 }}>Browsers</div>
              <BarList items={data.browsers} />
            </div>
            <div style={card}>
              <div style={{ ...label, marginBottom: 12 }}>Countries</div>
              <BarList items={data.countries} />
            </div>
            <div style={card}>
              <div style={{ ...label, marginBottom: 12 }}>Cities</div>
              <BarList items={data.cities} />
            </div>
          </div>

          <div style={card}>
            <div style={{ ...label, marginBottom: 12 }}>Recent visits</div>
            <Table
              head={["When", "Page", "Place", "Device", "Browser / OS", "Map"]}
              rows={data.recentVisits.map((v) => [
                v.when,
                v.page || "/",
                [v.city, v.region, v.country].filter(Boolean).join(", ") || "Unknown",
                [v.deviceType, v.deviceName].filter(Boolean).join(" · "),
                [v.browser, v.os].filter(Boolean).join(" · "),
                v.map ? <a href={v.map} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>Open map</a> : "-",
              ])}
            />
          </div>

          <div style={card}>
            <div style={{ ...label, marginBottom: 12 }}>Messages</div>
            {data.recentMessages.length === 0 && <p style={{ opacity: 0.6, margin: 0 }}>No messages yet</p>}
            <div style={{ display: "grid", gap: 12 }}>
              {data.recentMessages.map((m, i) => (
                <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, fontSize: 14 }}>
                    <b>{m.name}</b>
                    <span style={{ opacity: 0.6 }}>{m.when}</span>
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.7, margin: "4px 0 10px" }}>
                    <a href={`mailto:${m.email}`} style={{ color: "var(--accent)" }}>{m.email}</a>
                    {" · "}{[m.city, m.country].filter(Boolean).join(", ") || "Unknown"}
                    {" · "}{[m.deviceType].filter(Boolean).join("")}
                    {m.hasExact ? " · exact location shared" : ""}
                    {" · auto-reply: "}{m.autoReply}
                  </div>
                  <p style={{ margin: 0, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{m.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={card}>
            <div style={{ ...label, marginBottom: 12 }}>AI assistant questions</div>
            {data.recentQuestions.length === 0 && <p style={{ opacity: 0.6, margin: 0 }}>No questions yet</p>}
            <div style={{ display: "grid", gap: 12 }}>
              {data.recentQuestions.map((q, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
                  <div style={{ fontSize: 13, opacity: 0.6 }}>{q.when} · {[q.city, q.country].filter(Boolean).join(", ") || "Unknown"}</div>
                  <div style={{ fontWeight: 600, marginTop: 4, overflowWrap: "anywhere" }}>{q.question}</div>
                </div>
              ))}
            </div>
          </div>

          <a href="./" style={{ fontSize: 14, opacity: 0.7 }}>← Back to site</a>
        </div>
      )}
    </Shell>
  );
}
