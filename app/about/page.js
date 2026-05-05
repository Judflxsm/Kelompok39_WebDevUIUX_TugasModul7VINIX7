// app/page.js — Home Page (Server Component)
import Link from 'next/link'

// ── Icon SVGs ──────────────────────────────────────────────
function IconBox() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function IconShip() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.3.64 4.45 1.62 6"/>
      <path d="M10 3.03A1 1 0 0 0 9 4v7l3 1 3-1V4a1 1 0 0 0-1-1z"/>
    </svg>
  )
}

function IconDoc() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// ── Data ───────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <IconBox />,
    title: 'Monitoring Stok',
    desc: 'Pantau inventaris gudang secara real-time. Notifikasi otomatis saat stok kritis, laporan konsumsi bulanan, dan rekonsiliasi barang masuk-keluar.',
    tag: 'Inventory',
    points: ['Real-time dashboard', 'Alert stok kritis', 'Laporan otomatis'],
  },
  {
    icon: <IconShip />,
    title: 'Tracking Kapal',
    desc: 'Lacak posisi armada kapal di seluruh rute. Jadwal sandar, status muatan, dan estimasi kedatangan terintegrasi dalam satu peta interaktif.',
    tag: 'Fleet',
    points: ['Peta posisi live', 'Jadwal sandar', 'Status muatan'],
  },
  {
    icon: <IconDoc />,
    title: 'Surat Jalan Digital',
    desc: 'Buat, verifikasi, dan arsipkan surat jalan pengiriman secara digital. Tanda tangan elektronik, QR tracking, dan sinkronisasi dengan sistem gudang.',
    tag: 'Dokumen',
    points: ['Tanda tangan digital', 'QR tracking', 'Arsip cloud'],
  },
]

const STATS = [
  { number: '200+', label: 'Kapal Terpantau' },
  { number: '50K+', label: 'Surat Jalan Diproses' },
  { number: '98.5%', label: 'Uptime SLA' },
  { number: '12 Kota', label: 'Jangkauan Pelabuhan' },
]

const LOGOS = ['PT Pelabuhan Nusa', 'Armada Samudra', 'Kargo Express', 'Maritime Hub', 'Dermaga Prima']

// ── Component ──────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <style>{`
        /* ── HERO ── */
        .hero {
          position: relative;
          padding: 110px 0 100px;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 8px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 999px;
          font-size: 13px;
          color: #c9a84c;
          font-weight: 500;
          margin-bottom: 28px;
          animation: fadeUp 0.5s ease forwards;
        }

        .hero-badge-dot {
          width: 24px;
          height: 24px;
          background: rgba(201,168,76,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f7fa;
          max-width: 780px;
          margin-bottom: 24px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .hero-title .accent {
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 18px;
          color: #b8c4d4;
          max-width: 540px;
          line-height: 1.75;
          margin-bottom: 44px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .hero-note {
          font-size: 13px;
          color: #6b7e9a;
          margin-top: 20px;
          animation: fadeUp 0.6s 0.4s ease both;
        }

        .hero-note strong { color: #b8c4d4; }

        /* Hero visual */
        .hero-visual {
          position: absolute;
          right: -80px;
          top: 50%;
          transform: translateY(-50%);
          width: 460px;
          height: 460px;
          opacity: 0.06;
          pointer-events: none;
        }

        /* ── LOGOS ── */
        .logos-section {
          padding: 36px 0;
          border-top: 1px solid rgba(30,45,74,0.6);
          border-bottom: 1px solid rgba(30,45,74,0.6);
        }

        .logos-label {
          font-size: 12px;
          color: #6b7e9a;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          text-align: center;
        }

        .logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .logo-item {
          font-size: 13px;
          font-weight: 600;
          color: #1e2d4a;
          padding: 8px 20px;
          border: 1px solid rgba(30,45,74,0.6);
          border-radius: 8px;
          letter-spacing: 0.02em;
          transition: border-color 0.2s, color 0.2s;
        }

        .logo-item:hover {
          border-color: rgba(201,168,76,0.25);
          color: #6b7e9a;
        }

        /* ── FEATURES ── */
        .feature-card {
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          padding: 36px 32px;
          transition: transform 0.22s ease, border-color 0.22s, box-shadow 0.22s;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          opacity: 0;
          transition: opacity 0.22s;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,168,76,0.2);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3), 0 0 40px rgba(201,168,76,0.06);
        }

        .feature-card:hover::before { opacity: 1; }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          margin-bottom: 20px;
        }

        .feature-tag {
          display: inline-block;
          padding: 3px 10px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: #c9a84c;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #f5f7fa;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .feature-desc {
          font-size: 14.5px;
          color: #6b7e9a;
          line-height: 1.75;
          margin-bottom: 22px;
        }

        .feature-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feature-point {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #b8c4d4;
        }

        .point-check {
          width: 20px;
          height: 20px;
          background: rgba(14,165,184,0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0ea5b8;
          flex-shrink: 0;
        }

        /* ── STATS ── */
        .stats-section {
          background: linear-gradient(135deg, #0c1527 0%, #0a0f1e 100%);
          border: 1px solid #1e2d4a;
          border-radius: 24px;
          padding: 56px 48px;
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-lbl {
          font-size: 13px;
          color: #6b7e9a;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        /* ── CTA SECTION ── */
        .cta-section {
          text-align: center;
          padding: 96px 0;
        }

        .cta-box {
          background: linear-gradient(135deg, rgba(201,168,76,0.06), rgba(14,165,184,0.04));
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 28px;
          padding: 72px 48px;
          position: relative;
          overflow: hidden;
        }

        .cta-box::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%; transform: translateX(-50%);
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
        }

        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #f5f7fa;
          margin-bottom: 16px;
          position: relative;
        }

        .cta-desc {
          font-size: 17px;
          color: #b8c4d4;
          max-width: 500px;
          margin: 0 auto 36px;
          line-height: 1.7;
          position: relative;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          position: relative;
        }

        @media (max-width: 860px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-visual { display: none; }
        }

        @media (max-width: 560px) {
          .hero { padding: 72px 0 64px; }
          .stats-section { padding: 36px 24px; }
          .cta-box { padding: 48px 24px; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <div className="hero-badge-dot">⚓</div>
            Platform Logistik Maritim #1 Indonesia
          </div>

          <h1 className="hero-title">
            Kelola Armada &amp; Stok<br />
            <span className="accent">Tanpa Kerumitan</span>
          </h1>

          <p className="hero-desc">
            ShipLog menyatukan monitoring inventaris, tracking kapal, dan surat jalan digital
            dalam satu platform SaaS yang dirancang khusus untuk operator logistik perkapalan.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-gold" style={{ fontSize: '16px', padding: '15px 36px' }}>
              Mulai Sekarang →
            </Link>
            <Link href="/services" className="btn btn-outline">
              Lihat Fitur
            </Link>
          </div>

          <p className="hero-note">
            <strong>Gratis 30 hari</strong> · Tanpa kartu kredit · Setup 5 menit
          </p>
        </div>

        {/* Decorative SVG ship outline */}
        <svg className="hero-visual" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="190" stroke="#c9a84c" strokeWidth="1"/>
          <circle cx="200" cy="200" r="140" stroke="#c9a84c" strokeWidth="0.5"/>
          <path d="M80 230 Q200 150 320 230 L310 270 Q200 300 90 270 Z" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
          <line x1="200" y1="100" x2="200" y2="230" stroke="#c9a84c" strokeWidth="1"/>
          <path d="M200 140 L240 200 L200 195 Z" stroke="#c9a84c" strokeWidth="1" fill="none"/>
        </svg>
      </section>

      {/* ══ PARTNER LOGOS ═════════════════════════════════════ */}
      <section className="logos-section">
        <div className="container">
          <p className="logos-label">Dipercaya oleh operator terkemuka</p>
          <div className="logos-row">
            {LOGOS.map((name) => (
              <div key={name} className="logo-item">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="badge badge-gold">Platform</span>
            <h2 className="display-lg" style={{ marginTop: 16, color: '#f5f7fa' }}>
              Tiga Pilar Operasional
            </h2>
            <div className="gold-line center" />
            <p style={{ color: '#6b7e9a', maxWidth: 520, margin: '0 auto', fontSize: '16px', lineHeight: 1.75 }}>
              Setiap fitur ShipLog dirancang dari kebutuhan nyata operator lapangan, bukan asumsi.
            </p>
          </div>

          <div className="grid-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <span className="feature-tag">{f.tag}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <ul className="feature-points">
                  {f.points.map((p) => (
                    <li key={p} className="feature-point">
                      <div className="point-check"><IconCheck /></div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════ */}
      <section className="section-sm">
        <div className="container">
          <div className="stats-section">
            <div className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="stat-item">
                  <div className="stat-num">{s.number}</div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Siap Digitalisasi Logistik Anda?</h2>
            <p className="cta-desc">
              Bergabung dengan ratusan operator yang telah memangkas biaya operasional hingga 35%
              dengan ShipLog.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-gold" style={{ fontSize: '16px', padding: '15px 36px' }}>
                Mulai Gratis 30 Hari
              </Link>
              <Link href="/about" className="btn btn-outline">
                Kenali Kami →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}