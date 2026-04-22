import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #fafafa;
    color: #111;
  }

  .page {
    min-height: 100vh;
    background: #fff;
    padding: 48px 40px 64px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* HEADER */
  .header {
    text-align: center;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.6s ease forwards;
  }

  .header-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #888;
    border: 1px solid #e0e0e0;
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 20px;
  }

  .header h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 400;
    letter-spacing: -0.02em;
    color: #0a0a0a;
    line-height: 1.15;
  }

  .header h1 span {
    color: #1a56db;
  }

  .header p {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  /* GRID */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }

  /* CARD BASE */
  .card {
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 16px;
    padding: 28px;
    position: relative;
    opacity: 0;
    transform: translateY(16px);
    animation: fadeUp 0.55s ease forwards;
  }

  .card:nth-child(1) { animation-delay: 0.1s; }
  .card:nth-child(2) { animation-delay: 0.2s; grid-row: 1 / 3; }
  .card:nth-child(3) { animation-delay: 0.15s; }
  .card:nth-child(4) { animation-delay: 0.25s; }
  .card:nth-child(5) { animation-delay: 0.3s; }

  .card-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ececec;
  }

  /* PROBLEM CARD */
  .card-problem { background: #fff; }
  .card-problem .card-label { color: #e53e3e; }

  .problem-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .problem-item:last-child { border-bottom: none; padding-bottom: 0; }

  .problem-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e53e3e;
    margin-top: 6px;
    flex-shrink: 0;
  }

  .problem-item p {
    font-size: 13px;
    color: #444;
    font-weight: 400;
    line-height: 1.5;
  }

  /* SOLUTION CARD (center, tall) */
  .card-solution {
    background: #0a0a0a;
    color: #fff;
    display: flex;
    flex-direction: column;
  }

  .card-solution .card-label { color: #6b9fff; }
  .card-solution .card-label::after { background: #222; }

  .phone-mockup {
    background: linear-gradient(145deg, #1a1a1a, #111);
    border: 1px solid #2a2a2a;
    border-radius: 24px;
    padding: 16px;
    margin: 4px 0 20px;
    position: relative;
    overflow: hidden;
  }

  .phone-screen {
    background: #fff;
    border-radius: 14px;
    padding: 12px;
    min-height: 180px;
  }

  .screen-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }

  .screen-logo {
    font-size: 10px;
    font-weight: 700;
    color: #1a56db;
    letter-spacing: 0.05em;
  }

  .screen-status {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
  }

  .screen-stat-row {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }

  .screen-stat {
    flex: 1;
    background: #f8faff;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
  }

  .screen-stat-num {
    font-size: 14px;
    font-weight: 700;
    color: #1a56db;
    line-height: 1;
  }

  .screen-stat-label {
    font-size: 7px;
    color: #999;
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .screen-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid #f5f5f5;
  }

  .screen-list-item:last-child { border-bottom: none; }

  .screen-list-label {
    font-size: 8px;
    color: #555;
    font-weight: 500;
  }

  .screen-badge {
    font-size: 7px;
    padding: 2px 6px;
    border-radius: 100px;
    font-weight: 600;
  }

  .badge-green { background: #dcfce7; color: #16a34a; }
  .badge-blue { background: #dbeafe; color: #1d4ed8; }
  .badge-orange { background: #ffedd5; color: #c2410c; }

  .solution-features {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    background: #111;
    border-radius: 10px;
    border: 1px solid #1e1e1e;
    transition: border-color 0.2s;
  }

  .feature-item:hover { border-color: #2a2a2a; }

  .feature-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .fi-blue { background: #1a56db18; }
  .fi-indigo { background: #6366f118; }
  .fi-teal { background: #0d948018; }

  .feature-text h4 {
    font-size: 11px;
    font-weight: 600;
    color: #f0f0f0;
    letter-spacing: 0.02em;
  }

  .feature-text p {
    font-size: 10px;
    color: #666;
    margin-top: 2px;
    line-height: 1.4;
    font-weight: 300;
  }

  /* VALUE LEVERS */
  .card-value .card-label { color: #059669; }

  .lever-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid #f5f5f5;
  }

  .lever-item:last-child { border-bottom: none; padding-bottom: 0; }

  .lever-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .li-green { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .li-blue { background: #eff6ff; border: 1px solid #bfdbfe; }

  .lever-text h4 {
    font-size: 12px;
    font-weight: 600;
    color: #111;
  }

  .lever-text p {
    font-size: 11px;
    color: #888;
    margin-top: 2px;
    font-weight: 300;
  }

  /* BUSINESS MODEL */
  .card-biz .card-label { color: #7c3aed; }

  .biz-triangle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 8px 0 16px;
  }

  .biz-top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .biz-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .biz-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #7c3aed;
  }

  .biz-node-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #7c3aed;
  }

  .biz-node-sub {
    font-size: 9px;
    color: #aaa;
    font-weight: 300;
  }

  .biz-connector {
    width: 1px;
    height: 20px;
    background: #e0e0e0;
  }

  .biz-row {
    display: flex;
    gap: 48px;
    align-items: center;
    position: relative;
  }

  .biz-row::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background: #e0e0e0;
  }

  .biz-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .biz-tag {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .biz-tag-key {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #7c3aed;
    white-space: nowrap;
  }

  .biz-tag-val {
    font-size: 11px;
    color: #555;
    font-weight: 300;
  }

  /* HEALTH SCORE */
  .card-health .card-label { color: #d97706; }

  .health-body {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .gauge-wrap {
    position: relative;
    width: 80px;
    height: 44px;
    flex-shrink: 0;
  }

  .gauge-svg { overflow: visible; }

  .gauge-number {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .gauge-number span {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: #0a0a0a;
    line-height: 1;
  }

  .gauge-number small {
    font-size: 9px;
    color: #aaa;
    display: block;
    letter-spacing: 0.06em;
    font-weight: 300;
  }

  .health-meta { flex: 1; }

  .health-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #f5f5f5;
  }

  .health-row:last-child { border-bottom: none; }

  .health-row-label {
    font-size: 10px;
    color: #999;
    font-weight: 300;
  }

  .health-row-value {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
  }

  .hv-red { background: #fff1f1; color: #dc2626; }
  .hv-green { background: #f0fdf4; color: #16a34a; }
  .hv-strong { background: #f5f3ff; color: #7c3aed; }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 860px) {
    .grid {
      grid-template-columns: 1fr;
    }
    .card:nth-child(2) { grid-row: auto; }
  }
`;

export default function VillageHub() {
  const [gaugeAnim, setGaugeAnim] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setGaugeAnim(75), 400);
    return () => clearTimeout(t);
  }, []);

  const pct = gaugeAnim;
  const r = 36;
  const cx = 40;
  const cy = 40;
  const circ = Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* HEADER */}
        <div className="header">
          <div className="header-badge">Smart Community Platform</div>
          <h1><span>VillageHub</span>: Smart Community<br />Management Platform</h1>
          <p>Smart · Transparent · Connected Village Management</p>
        </div>

        {/* MAIN GRID */}
        <div className="grid">

          {/* PROBLEM */}
          <div className="card card-problem">
            <div className="card-label">Problem</div>
            {[
              "Inefficient administrative processes",
              "Lack of transparency in decision-making",
              "Fragmented communication channels",
              "No centralized data management",
            ].map((text, i) => (
              <div className="problem-item" key={i}>
                <div className="problem-dot" />
                <p>{text}</p>
              </div>
            ))}
          </div>

          {/* SOLUTION (center) */}
          <div className="card card-solution">
            <div className="card-label" style={{ color: "#6b9fff" }}>Solution — VillageHub Platform</div>

            {/* Phone Mockup */}
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="screen-header">
                  <span className="screen-logo">VillageHub</span>
                  <div className="screen-status" />
                </div>
                <div className="screen-stat-row">
                  {[["300", "Management"], ["300", "Residents"], ["125", "Decisions"]].map(([n, l]) => (
                    <div className="screen-stat" key={l}>
                      <div className="screen-stat-num">{n}</div>
                      <div className="screen-stat-label">{l}</div>
                    </div>
                  ))}
                </div>
                {[
                  ["Monthly Fee", "badge-green", "Paid"],
                  ["Maintenance", "badge-blue", "Scheduled"],
                  ["New Request", "badge-orange", "Pending"],
                ].map(([label, cls, status]) => (
                  <div className="screen-list-item" key={label}>
                    <span className="screen-list-label">{label}</span>
                    <span className={`screen-badge ${cls}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="solution-features">
              {[
                { icon: "⚡", cls: "fi-blue", title: "Efficiency & Engagement", desc: "Real-time dashboard for management & full transparency" },
                { icon: "📱", cls: "fi-indigo", title: "Mobile App", desc: "Resident convenience, engagement & notifications" },
                { icon: "🗂️", cls: "fi-teal", title: "Single Source of Truth", desc: "One platform covering all community needs" },
              ].map((f) => (
                <div className="feature-item" key={f.title}>
                  <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
                  <div className="feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUSINESS MODEL */}
          <div className="card card-biz">
            <div className="card-label">Business Model</div>
            <div className="biz-triangle">
              <div className="biz-node">
                <div className="biz-dot" />
                <div className="biz-node-label">Decision Maker</div>
                <div className="biz-node-sub">(Committee)</div>
              </div>
              <div className="biz-connector" />
              <div className="biz-row">
                <div className="biz-node">
                  <div className="biz-dot" />
                  <div className="biz-node-label">Payer</div>
                  <div className="biz-node-sub">(Villa Assoc.)</div>
                </div>
                <div className="biz-node">
                  <div className="biz-dot" />
                  <div className="biz-node-label">User</div>
                  <div className="biz-node-sub">(Residents)</div>
                </div>
              </div>
            </div>
            <div className="biz-details">
              {[
                ["Model", "SaaS — Monthly Subscription"],
                ["Market", "Housing Projects & Asset Firms"],
                ["Revenue", "Monthly Subscription"],
              ].map(([k, v]) => (
                <div className="biz-tag" key={k}>
                  <span className="biz-tag-key">{k}</span>
                  <span className="biz-tag-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VALUE LEVERS */}
          <div className="card card-value">
            <div className="card-label">Value Levers</div>
            {[
              { icon: "⚖️", cls: "li-green", title: "Structural Value", sub: "Records & Documentation" },
              { icon: "🛡️", cls: "li-blue", title: "Emotional Value", sub: "Trust & Community Pride" },
            ].map((l) => (
              <div className="lever-item" key={l.title}>
                <div className={`lever-icon ${l.cls}`}>{l.icon}</div>
                <div className="lever-text">
                  <h4>{l.title}</h4>
                  <p>{l.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* HEALTH SCORE */}
          <div className="card card-health">
            <div className="card-label">Health Score</div>
            <div className="health-body">
              <div className="gauge-wrap">
                <svg width="80" height="44" viewBox="0 0 80 50" className="gauge-svg">
                  {/* Track */}
                  <path
                    d="M 8 44 A 32 32 0 0 1 72 44"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Fill */}
                  <path
                    d="M 8 44 A 32 32 0 0 1 72 44"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${circ}`}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
                  />
                </svg>
                <div className="gauge-number">
                  <span>15</span>
                  <small>/ 20</small>
                </div>
              </div>
              <div className="health-meta">
                <div className="health-row">
                  <span className="health-row-label">Overall</span>
                  <span className="health-row-value hv-strong">STRONG</span>
                </div>
                <div className="health-row">
                  <span className="health-row-label">Problem Severity</span>
                  <span className="health-row-value hv-red">HIGH</span>
                </div>
                <div className="health-row">
                  <span className="health-row-label">Payer/User Clarity</span>
                  <span className="health-row-value hv-green">CLEAR</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}