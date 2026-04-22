import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&family=Kanit:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Kanit', 'DM Sans', sans-serif;
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
    font-size: 16px;
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

  /* PHONE MOCKUP */
  .phone-mockup {
    background: linear-gradient(160deg, #1e1e1e 0%, #111 100%);
    border: 1.5px solid #2a2a2a;
    border-radius: 28px;
    padding: 10px 10px 14px;
    margin: 4px 0 20px;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .phone-notch {
    width: 40px;
    height: 5px;
    background: #2a2a2a;
    border-radius: 100px;
    margin: 0 auto 8px;
  }

  .phone-screen {
    background: #f7f8fa;
    border-radius: 18px;
    overflow: hidden;
  }

  /* Status bar */
  .screen-statusbar {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px 3px;
  }
  .statusbar-time {
    font-size: 8px;
    font-weight: 700;
    color: #111;
    letter-spacing: 0.03em;
  }
  .statusbar-icons {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .statusbar-icon {
    font-size: 7px;
    color: #555;
  }

  /* App top bar */
  .screen-appbar {
    background: #fff;
    padding: 6px 10px 8px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .appbar-left { display: flex; align-items: center; gap: 6px; }
  .appbar-avatar {
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, #1a56db, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 8px; color: #fff; font-weight: 700;
  }
  .appbar-greeting { font-size: 9px; color: #888; font-weight: 300; }
  .appbar-name { font-size: 10px; font-weight: 600; color: #111; margin-top: 0; }
  .appbar-right { display: flex; gap: 6px; }
  .appbar-btn {
    width: 22px; height: 22px; border-radius: 50%;
    background: #f5f5f5; border: none;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; cursor: pointer;
  }
  .notif-dot {
    position: relative;
  }
  .notif-dot::after {
    content: '';
    position: absolute;
    top: 1px; right: 1px;
    width: 5px; height: 5px;
    background: #ef4444;
    border-radius: 50%;
    border: 1px solid #fff;
  }

  /* Tab nav */
  .screen-tabs {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 8px;
  }
  .screen-tab {
    flex: 1;
    padding: 6px 0 5px;
    font-size: 8px;
    font-weight: 500;
    color: #bbb;
    text-align: center;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  .screen-tab.active {
    color: #1a56db;
    border-bottom-color: #1a56db;
    font-weight: 600;
  }

  /* Tab content */
  .screen-body { padding: 8px; min-height: 220px; }

  /* Dashboard tab */
  .screen-stat-row {
    display: flex;
    gap: 5px;
    margin-bottom: 7px;
  }
  .screen-stat {
    flex: 1;
    background: #fff;
    border-radius: 10px;
    padding: 7px 5px;
    text-align: center;
    border: 1px solid #f0f0f0;
  }
  .screen-stat-num {
    font-size: 13px;
    font-weight: 700;
    color: #1a56db;
    line-height: 1;
  }
  .screen-stat-label {
    font-size: 6.5px;
    color: #aaa;
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .screen-section-title {
    font-size: 8px;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 8px 0 5px;
  }

  .screen-chart-bar-row {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 36px;
    margin-bottom: 3px;
  }
  .screen-chart-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .screen-chart-bar {
    width: 100%;
    border-radius: 3px 3px 0 0;
    background: #dbeafe;
    transition: height 0.8s cubic-bezier(.4,0,.2,1);
  }
  .screen-chart-bar.active-bar { background: #1a56db; }
  .screen-chart-label { font-size: 6px; color: #bbb; }

  .screen-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 6px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 4px;
    border: 1px solid #f5f5f5;
  }
  .screen-list-left { display: flex; align-items: center; gap: 6px; }
  .screen-list-icon {
    width: 20px; height: 20px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center; font-size: 9px;
  }
  .sli-blue { background: #eff6ff; }
  .sli-green { background: #f0fdf4; }
  .sli-orange { background: #fff7ed; }
  .sli-red { background: #fef2f2; }
  .screen-list-info {}
  .screen-list-label {
    font-size: 8px;
    color: #333;
    font-weight: 500;
    display: block;
  }
  .screen-list-sub {
    font-size: 7px;
    color: #bbb;
    display: block;
    margin-top: 1px;
  }
  .screen-badge {
    font-size: 7px;
    padding: 2px 6px;
    border-radius: 100px;
    font-weight: 600;
    white-space: nowrap;
  }
  .badge-green { background: #dcfce7; color: #16a34a; }
  .badge-blue { background: #dbeafe; color: #1d4ed8; }
  .badge-orange { background: #ffedd5; color: #c2410c; }
  .badge-red { background: #fee2e2; color: #dc2626; }
  .badge-gray { background: #f3f4f6; color: #6b7280; }

  /* Residents tab */
  .resident-card {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 5px;
    border: 1px solid #f0f0f0;
  }
  .resident-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .resident-info { flex: 1; }
  .resident-name { font-size: 9px; font-weight: 600; color: #222; }
  .resident-unit { font-size: 7.5px; color: #aaa; margin-top: 1px; }
  .resident-status-col { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }

  /* Finance tab */
  .finance-summary {
    background: linear-gradient(135deg, #1a56db, #3b82f6);
    border-radius: 12px;
    padding: 10px 12px;
    margin-bottom: 8px;
    color: #fff;
  }
  .finance-label { font-size: 7px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.1em; }
  .finance-amount { font-size: 18px; font-weight: 700; line-height: 1.2; }
  .finance-sub { font-size: 7px; opacity: 0.6; margin-top: 2px; }
  .finance-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 6px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 4px;
    border: 1px solid #f5f5f5;
  }
  .finance-row-left { display: flex; align-items: center; gap: 6px; }
  .finance-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .finance-row-label { font-size: 8px; color: #333; font-weight: 500; }
  .finance-row-date { font-size: 7px; color: #bbb; margin-top: 1px; }
  .finance-amount-sm { font-size: 8.5px; font-weight: 700; }

  /* Bottom nav */
  .screen-bottomnav {
    display: flex;
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 6px 0 8px;
  }
  .bottom-nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    cursor: pointer;
  }
  .bottom-nav-icon { font-size: 12px; }
  .bottom-nav-label { font-size: 6.5px; color: #bbb; font-weight: 500; }
  .bottom-nav-item.active .bottom-nav-label { color: #1a56db; }
  .bottom-nav-item.active .bottom-nav-icon { filter: none; }


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
    text-align: left;
  }

  .lever-text p {
    font-size: 11px;
    color: #888;
    margin-top: 2px;
    font-weight: 300;
    text-align: left;
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
    bottom: 5px;
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

const barHeights = [55, 70, 45, 80, 65, 90, 75];
const barMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

const residents = [
  { name: "Somchai P.", unit: "A-101", color: "#1a56db", initials: "SP", fee: "badge-green", feeLabel: "ชำระแล้ว" },
  { name: "Nuttida K.", unit: "B-203", color: "#059669", initials: "NK", fee: "badge-green", feeLabel: "ชำระแล้ว" },
  { name: "Wanchai T.", unit: "C-315", color: "#d97706", initials: "WT", fee: "badge-orange", feeLabel: "ครบกำหนด" },
  { name: "Patcharee S.", unit: "A-204", color: "#7c3aed", initials: "PS", fee: "badge-green", feeLabel: "ชำระแล้ว" },
  { name: "Ratthapong M.", unit: "D-108", color: "#e53e3e", initials: "RM", fee: "badge-red", feeLabel: "ล่าช้า" },
];

const finances = [
  { label: "ค่าธรรมเนียมรายเดือน — เมษายน", date: "1 เมษายน 2025", amount: "+฿180,000", color: "#22c55e", positive: true },
  { label: "งานซ่อมบำรุง", date: "5 เมษายน 2025", amount: "-฿32,500", color: "#ef4444", positive: false },
  { label: "บริการรักษาความปลอดภัย", date: "8 เมษายน 2025", amount: "-฿18,000", color: "#ef4444", positive: false },
  { label: "ทำความสะอาดสระว่ายน้ำ", date: "10 เมษายน 2025", amount: "-฿6,200", color: "#ef4444", positive: false },
  { label: "รายได้ค่าปรับล่าช้า", date: "12 เมษายน 2025", amount: "+฿4,500", color: "#22c55e", positive: true },
];

const requests = [
  { icon: "🔧", cls: "sli-blue", label: "ซ่อมเครื่องปรับอากาศ — B-203", sub: "ขอแล้ว · 2 ชม. ที่ผ่านมา", badge: "badge-orange", status: "กำลังดำเนินการ" },
  { icon: "🌿", cls: "sli-green", label: "บำรุงสวน", sub: "กำหนดแล้ว · 18 เมษายน", badge: "badge-blue", status: "กำหนดแล้ว" },
  { icon: "💡", cls: "sli-orange", label: "ไฟล็อบบี้ดับ — อาคาร C", sub: "ส่งแล้ว · 1 วันที่แล้ว", badge: "badge-orange", status: "รอดำเนินการ" },
  { icon: "🚗", cls: "sli-red", label: "ข้อพิพาทที่จอดรถ — P12", sub: "ด่วน · 30 นาทีที่แล้ว", badge: "badge-red", status: "ด่วน" },
];

export default function VillageHub() {
  const [gaugeAnim, setGaugeAnim] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGaugeAnim(75), 400);
    const t2 = setTimeout(() => setBarsReady(true), 600);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const tabs = ["แดชบอร์ด", "ผู้อยู่อาศัย", "การเงิน", "คำขอ"];
  const bottomNav = [
    { icon: "🏠", label: "หน้าแรก" },
    { icon: "👥", label: "ผู้อยู่อาศัย" },
    { icon: "💬", label: "แชท" },
    { icon: "⚙️", label: "ตั้งค่า" },
  ];

  const pct = gaugeAnim;
  const r = 36;
  const circ = Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* HEADER */}
        <div className="header">
          <div className="header-badge">แพลตฟอร์มชุมชนอัจฉริยะ</div>
          <h1><span>VillageHub</span>: แพลตฟอร์มจัดการชุมชนอัจฉริยะ<br />ที่เปลี่ยนแปลงทุกอย่าง</h1>
          <p>อัจฉริยะ · โปร่งใส · เชื่อมต่อทุกคนในชุมชน</p>
        </div>

        {/* MAIN GRID */}
        <div className="grid">

          {/* PROBLEM */}
          <div className="card card-problem">
            <div className="card-label">ปัญหาที่ต้องแก้ไข</div>
            {[
              "กระบวนการบริหารที่ล่าช้าและไม่มีประสิทธิภาพ",
              "ขาดความโปร่งใสในการตัดสินใจสำคัญ",
              "ช่องทางการสื่อสารที่กระจัดกระจายและไม่เป็นระบบ",
              "ไม่มีระบบจัดการข้อมูลแบบรวมศูนย์",
            ].map((text, i) => (
              <div className="problem-item" key={i}>
                <div className="problem-dot" />
                <p>{text}</p>
              </div>
            ))}
          </div>

          {/* SOLUTION (center) */}
          <div className="card card-solution">
            <div className="card-label" style={{ color: "#6b9fff", paddingLeft:"61px" }}>VillageHub</div>

            {/* Phone Mockup */}
            <div className="phone-mockup">
              <div className="phone-notch" />
              <div className="phone-screen">
                {/* Status bar */}
                <div className="screen-statusbar">
                  <span className="statusbar-time">9:41</span>
                  <div className="statusbar-icons">
                    <span className="statusbar-icon">●●●●</span>
                    <span className="statusbar-icon">WiFi</span>
                    <span className="statusbar-icon">🔋</span>
                  </div>
                </div>

                {/* App bar */}
                <div className="screen-appbar">
                  <div className="appbar-left">
                    <div className="appbar-avatar">V</div>
                    <div>
                      <div className="appbar-greeting">สวัสดีตอนเช้า,</div>
                      <div className="appbar-name">แอดมิน ชัยวัฒน์</div>
                    </div>
                  </div>
                  <div className="appbar-right">
                    <div className="appbar-btn notif-dot">🔔</div>
                    <div className="appbar-btn">👤</div>
                  </div>
                </div>

                {/* Tab nav */}
                <div className="screen-tabs">
                  {tabs.map((t, i) => (
                    <div
                      key={t}
                      className={`screen-tab${activeTab === i ? " active" : ""}`}
                      onClick={() => setActiveTab(i)}
                    >{t}</div>
                  ))}
                </div>

                {/* Tab content */}
                <div className="screen-body">

                  {/* DASHBOARD */}
                  {activeTab === 0 && (<>
                    <div className="screen-stat-row">
                      {[["300", "ยูนิต"], ["287", "ผู้อยู่อาศัย"], ["94%", "อัตราการชำระค่าธรรมเนียม"]].map(([n, l]) => (
                        <div className="screen-stat" key={l}>
                          <div className="screen-stat-num">{n}</div>
                          <div className="screen-stat-label">{l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="screen-section-title">การเก็บค่าธรรมเนียมรายเดือน</div>
                    <div className="screen-chart-bar-row">
                      {barHeights.map((h, i) => (
                        <div className="screen-chart-bar-wrap" key={i}>
                          <div
                            className={`screen-chart-bar${i === 6 ? " active-bar" : ""}`}
                            style={{ height: barsReady ? `${h}%` : "0%", transition: `height ${0.4 + i * 0.08}s cubic-bezier(.4,0,.2,1)` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:"4px", marginBottom:"8px" }}>
                      {barMonths.map(m => <div key={m} className="screen-chart-label" style={{ flex:1, textAlign:"center" }}>{m}</div>)}
                    </div>
                    <div className="screen-section-title">กิจกรรมล่าสุด</div>
                    {requests.slice(0,2).map(r => (
                      <div className="screen-list-item" key={r.label}>
                        <div className="screen-list-left">
                          <div className={`screen-list-icon ${r.cls}`}>{r.icon}</div>
                          <div className="screen-list-info">
                            <span className="screen-list-label">{r.label}</span>
                            <span className="screen-list-sub">{r.sub}</span>
                          </div>
                        </div>
                        <span className={`screen-badge ${r.badge}`}>{r.status}</span>
                      </div>
                    ))}
                  </>)}

                  {/* RESIDENTS */}
                  {activeTab === 1 && (<>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                      <span className="screen-section-title" style={{ margin:0 }}>ผู้อยู่อาศัยทั้งหมด</span>
                      <span className="screen-badge badge-blue">287 ใช้งานอยู่</span>
                    </div>
                    {residents.map(r => (
                      <div className="resident-card" key={r.name}>
                        <div className="resident-avatar" style={{ background: r.color }}>{r.initials}</div>
                        <div className="resident-info">
                          <div className="resident-name">{r.name}</div>
                          <div className="resident-unit">Unit {r.unit}</div>
                        </div>
                        <div className="resident-status-col">
                          <span className={`screen-badge ${r.fee}`}>{r.feeLabel}</span>
                        </div>
                      </div>
                    ))}
                  </>)}

                  {/* FINANCE */}
                  {activeTab === 2 && (<>
                    <div className="finance-summary">
                      <div className="finance-label">ยอดคงเหลือเดือนเมษายน</div>
                      <div className="finance-amount">฿127,800</div>
                      <div className="finance-sub">↑ ฿12,300 จากเดือนที่แล้ว</div>
                    </div>
                    <div className="screen-section-title">ธุรกรรม</div>
                    {finances.map(f => (
                      <div className="finance-row" key={f.label}>
                        <div className="finance-row-left">
                          <div className="finance-dot" style={{ background: f.color }} />
                          <div>
                            <div className="finance-row-label">{f.label}</div>
                            <div className="finance-row-date">{f.date}</div>
                          </div>
                        </div>
                        <div className="finance-amount-sm" style={{ color: f.positive ? "#16a34a" : "#dc2626" }}>{f.amount}</div>
                      </div>
                    ))}
                  </>)}

                  {/* REQUESTS */}
                  {activeTab === 3 && (<>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                      <span className="screen-section-title" style={{ margin:0 }}>คำขอ</span>
                      <span className="screen-badge badge-orange">4 เปิดอยู่</span>
                    </div>
                    {requests.map(r => (
                      <div className="screen-list-item" key={r.label}>
                        <div className="screen-list-left">
                          <div className={`screen-list-icon ${r.cls}`}>{r.icon}</div>
                          <div className="screen-list-info">
                            <span className="screen-list-label">{r.label}</span>
                            <span className="screen-list-sub">{r.sub}</span>
                          </div>
                        </div>
                        <span className={`screen-badge ${r.badge}`}>{r.status}</span>
                      </div>
                    ))}
                  </>)}

                </div>

                {/* Bottom nav */}
                <div className="screen-bottomnav">
                  {bottomNav.map((n, i) => (
                    <div
                      key={n.label}
                      className={`bottom-nav-item${activeTab === i ? " active" : ""}`}
                      onClick={() => setActiveTab(i)}
                    >
                      <span className="bottom-nav-icon">{n.icon}</span>
                      <span className="bottom-nav-label">{n.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="solution-features">
              {[
                { icon: "⚡", cls: "fi-blue", title: "ประสิทธิภาพสูงสุดและการมีส่วนร่วม", desc: "แดชบอร์ดแบบเรียลไทม์ที่ช่วยจัดการได้ง่ายและโปร่งใสเต็มรูปแบบ" },
                { icon: "📱", cls: "fi-indigo", title: "แอปมือถือที่ใช้งานง่าย", desc: "ความสะดวกสบายสำหรับผู้อยู่อาศัย เพิ่มการมีส่วนร่วม และแจ้งเตือนทันที" },
                { icon: "🗂️", cls: "fi-teal", title: "แหล่งข้อมูลเดียวที่เชื่อถือได้", desc: "แพลตฟอร์มครบครันที่ตอบสนองทุกความต้องการของชุมชน" },
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
            <div className="card-label">โมเดลธุรกิจที่ยั่งยืน</div>
            <div className="biz-triangle">
              <div className="biz-node">
                <div className="biz-dot" />
                <div className="biz-node-label">ผู้ตัดสินใจ</div>
                <div className="biz-node-sub">(คณะกรรมการ)</div>
              </div>
              <div className="biz-connector" />
              <div className="biz-row">
                <div className="biz-node">
                  <div className="biz-dot" />
                  <div className="biz-node-label">ผู้ชำระเงิน</div>
                  <div className="biz-node-sub">(สมาคมหมู่บ้าน)</div>
                </div>
                <div className="biz-node">
                  <div className="biz-dot" />
                  <div className="biz-node-label">ผู้ใช้</div>
                  <div className="biz-node-sub">(ผู้อยู่อาศัย)</div>
                </div>
              </div>
            </div>
            <div className="biz-details">
              {[
                ["โมเดล", "SaaS — การสมัครสมาชิกประจำเดือน"],
                ["ตลาด", "โครงการที่อยู่อาศัยและบริษัทจัดการสินทรัพย์"],
                ["รายได้", "การสมัครสมาชิกประจำเดือน"],
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
            <div className="card-label">จุดสร้างมูลค่าที่โดดเด่น</div>
            {[
              { icon: "⚖️", cls: "li-green", title: "มูลค่าทางโครงสร้าง", sub: "บันทึกและเอกสารที่ครบถ้วนและปลอดภัย" },
              { icon: "🛡️", cls: "li-blue", title: "มูลค่าทางอารมณ์", sub: "สร้างความไว้วางใจและความภาคภูมิใจในชุมชน" },
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
            <div className="card-label">คะแนนสุขภาพชุมชน</div>
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
                  <span className="health-row-label">โดยรวม</span>
                  <span className="health-row-value hv-strong">แข็งแรง</span>
                </div>
                <div className="health-row">
                  <span className="health-row-label">ความรุนแรงของปัญหา</span>
                  <span className="health-row-value hv-red">สูง</span>
                </div>
                <div className="health-row">
                  <span className="health-row-label">ความชัดเจนของผู้ชำระเงิน/ผู้ใช้</span>
                  <span className="health-row-value hv-green">ชัดเจน</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
