// app/services/page.js — Services Page (Server Component)
import Link from 'next/link'

export const metadata = {
  title: 'Layanan',
  description: 'Monitoring stok, tracking kapal, dan surat jalan digital — solusi lengkap logistik perkapalan ShipLog.',
}

// ── SVG Icons ──────────────────────────────────────────────
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// ── Services Data ──────────────────────────────────────────
const SERVICES = [
  {
    id: 'stok',
    emoji: '📦',
    label: 'Inventory',
    title: 'Monitoring Stok Real-Time',
    subtitle: 'Visibilitas penuh atas setiap unit barang di gudang Anda.',
    desc: `Sistem monitoring inventaris ShipLog memberikan gambaran lengkap stok barang di
           seluruh gudang yang terhubung. Dari sparepart mesin hingga barang kargo, setiap
           pergerakan tercatat otomatis dan dapat diaudit.`,
    features: [
      'Dashboard stok real-time per lokasi gudang',
      'Notifikasi otomatis saat level kritis',
      'Rekonsiliasi barang masuk & keluar',
      'Laporan konsumsi bulanan & tahunan',
      'Integrasi dengan sistem surat jalan',
      'Multi-gudang dalam satu dashboard',
    ],
    color: '#c9a84c',
    colorDim: 'rgba(201,168,76,0.08)',
    colorBorder: 'rgba(201,168,76,0.15)',
  },
  {
    id: 'kapal',
    emoji: '🚢',
    label: 'Fleet',
    title: 'Tracking Armada Kapal',
    subtitle: 'Ketahui posisi setiap kapal kapan saja, di mana saja.',
    desc: `Pantau armada kapal Anda secara real-time menggunakan integrasi AIS (Automatic
           Identification System). Jadwal sandar, status muatan, dan estimasi kedatangan
           tersedia dalam tampilan peta interaktif yang intuitif.`,
    features: [
      'Peta posisi live berbasis AIS',
      'Jadwal sandar & keberangkatan',
      'Status muatan per kapal',
      'Estimasi waktu kedatangan (ETA)',
      'Riwayat rute perjalanan',
      'Laporan efisiensi armada',
    ],
    color: '#0ea5b8',
    colorDim: 'rgba(14,165,184,0.08)',
    colorBorder: 'rgba(14,165,184,0.15)',
  },
  {
    id: 'surjal',
    emoji: '📄',
    label: 'Dokumen',
    title: 'Surat Jalan Digital',
    subtitle: 'Eliminasi kertas. Akselerasi verifikasi.',
    desc: `Buat, distribusikan, dan arsipkan surat jalan secara digital dengan tanda tangan
           elektronik yang sah secara hukum. QR code tracking memungkinkan siapapun
           memverifikasi keaslian dokumen dalam hitungan detik.`,
    features: [
      'Pembuatan surat jalan otomatis',
      'Tanda tangan elektronik (e-sign)',
      'QR code untuk verifikasi cepat',
      'Arsip cloud terenkripsi',
      'Notifikasi status per penerima',
      'Ekspor PDF & integrasi ERP',
    ],
    color: '#7c6af5',
    colorDim: 'rgba(124,106,245,0.08)',
    colorBorder: 'rgba(124,106,245,0.15)',
  },
]

const PRICING = [
  {
    name: 'Starter',
    price: 'Gratis',
    period: '/ 30 hari',
    desc: 'Cocok untuk trial dan tim kecil.',
    features: ['1 kapal', '1 gudang', 'Surat jalan dasar', 'Support email'],
    cta: 'Mulai Gratis',
    highlight: false,
  },
  {
    name: 'Professional',
    price: 'Rp 2.5jt',
    period: '/ bulan',
    desc: 'Untuk operator aktif dengan beberapa armada.',
    features: ['10 kapal', '5 gudang', 'Semua fitur surat jalan', 'Dashboard analytics', 'Support prioritas'],
    cta: 'Pilih Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Untuk korporasi dan operator pelabuhan besar.',
    features: ['Kapal tak terbatas', 'Gudang tak terbatas', 'API access', 'White-label', 'Dedicated support'],
    cta: 'Hubungi Sales',
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <>
      <style>{`
        /* ── Hero ── */
        .services-hero {
          padding: 96px 0 80px;
          position: relative;
        }

        .services-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          opacity: 0.35;
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 16px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          color: #f5f7fa;
          max-width: 660px;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero-desc {
          font-size: 17px;
          color: #b8c4d4;
          max-width: 520px;
          line-height: 1.8;
        }

        /* ── Service Block ── */
        .service-block {
          padding: 72px 0;
          border-top: 1px solid rgba(30,45,74,0.5);
        }

        .service-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .service-inner.reverse {
          direction: rtl;
        }

        .service-inner.reverse > * {
          direction: ltr;
        }

        .service-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px 5px 8px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 18px;
          border: 1px solid;
        }

        .service-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700;
          color: #f5f7fa;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .service-subtitle {
          font-size: 15px;
          font-weight: 500;
          color: #b8c4d4;
          margin-bottom: 18px;
        }

        .service-desc {
          font-size: 15px;
          color: #6b7e9a;
          line-height: 1.85;
          margin-bottom: 32px;
        }

        .service-features {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
        }

        .svc-feat {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 14px;
          color: #b8c4d4;
          line-height: 1.5;
        }

        .svc-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Service Visual Card */
        .service-visual {
          background: #0c1527;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .service-visual::after {
          content: attr(data-emoji);
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-size: 120px;
          opacity: 0.06;
          line-height: 1;
          pointer-events: none;
        }

        .visual-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .visual-title {
          font-size: 13px;
          font-weight: 600;
          color: #6b7e9a;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .visual-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #0ea5b8;
          font-weight: 600;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #0ea5b8;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Mock bars */
        .mock-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mock-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mock-bar-label {
          font-size: 12px;
          color: #6b7e9a;
          min-width: 80px;
          font-family: 'DM Mono', monospace;
        }

        .mock-bar-track {
          flex: 1;
          height: 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 999px;
          overflow: hidden;
        }

        .mock-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #c9a84c, #e8c97a);
        }

        .mock-bar-val {
          font-size: 12px;
          color: #c9a84c;
          font-family: 'DM Mono', monospace;
          min-width: 36px;
          text-align: right;
        }

        /* Mock route points */
        .mock-route {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .route-point {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .route-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .route-dot.active { background: #0ea5b8; box-shadow: 0 0 8px rgba(14,165,184,0.5); }
        .route-dot.done   { background: #c9a84c; }
        .route-dot.pending { background: #1e2d4a; border: 1px solid #2a3d5e; }

        .route-label { font-size: 13px; color: #b8c4d4; }
        .route-time  { font-size: 11px; color: #6b7e9a; margin-top: 2px; font-family: 'DM Mono', monospace; }

        /* Mock doc */
        .mock-doc {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 18px;
        }

        .mock-doc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .mock-doc-id { font-family: 'DM Mono', monospace; font-size: 13px; color: #c9a84c; }
        .mock-doc-badge { font-size: 11px; font-weight: 600; background: rgba(14,165,184,0.15); color: #0ea5b8; padding: 3px 10px; border-radius: 999px; }

        .mock-doc-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .mock-doc-key { font-size: 12px; color: #6b7e9a; }
        .mock-doc-val { font-size: 12px; color: #b8c4d4; }

        /* ── Pricing ── */
        .pricing-section {
          padding: 96px 0;
          border-top: 1px solid rgba(30,45,74,0.5);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .pricing-card {
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          padding: 36px 30px;
          position: relative;
          transition: transform 0.22s, box-shadow 0.22s;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }

        .pricing-card.highlight {
          border-color: rgba(201,168,76,0.35);
          background: linear-gradient(160deg, #131d35, #0f1a2e);
        }

        .pricing-card.highlight::before {
          content: 'Populer';
          position: absolute;
          top: -12px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: #0a0f1e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 999px;
        }

        .pricing-name {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 14px;
        }

        .pricing-price {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: #f5f7fa;
          line-height: 1;
          margin-bottom: 4px;
        }

        .pricing-period {
          font-size: 13px;
          color: #6b7e9a;
          margin-bottom: 12px;
        }

        .pricing-desc {
          font-size: 14px;
          color: #6b7e9a;
          line-height: 1.65;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(30,45,74,0.7);
        }

        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .pricing-feat {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #b8c4d4;
        }

        .pricing-feat-check {
          width: 18px;
          height: 18px;
          background: rgba(14,165,184,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0ea5b8;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .service-inner { grid-template-columns: 1fr; gap: 36px; }
          .service-inner.reverse { direction: ltr; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
          .service-features { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="services-hero">
        <div className="container">
          <p className="eyebrow">⚙ Layanan ShipLog</p>
          <h1 className="hero-title">
            Semua yang Dibutuhkan<br />Operator Logistik Modern
          </h1>
          <div className="gold-line" />
          <p className="hero-desc">
            Tiga modul terintegrasi yang bekerja bersama untuk memastikan
            setiap ton muatan, setiap kapal, dan setiap dokumen terlacak sempurna.
          </p>
        </div>
      </section>

      {/* ══ SERVICE BLOCKS ════════════════════════════════════ */}
      {/* 1. Monitoring Stok */}
      <section className="service-block">
        <div className="container">
          <div className="service-inner">
            <div>
              <div
                className="service-label"
                style={{ background: SERVICES[0].colorDim, borderColor: SERVICES[0].colorBorder, color: SERVICES[0].color }}
              >
                <span>📦</span> {SERVICES[0].label}
              </div>
              <h2 className="service-title">{SERVICES[0].title}</h2>
              <p className="service-subtitle">{SERVICES[0].subtitle}</p>
              <div className="gold-line" />
              <p className="service-desc">{SERVICES[0].desc}</p>
              <ul className="service-features">
                {SERVICES[0].features.map((f) => (
                  <li key={f} className="svc-feat">
                    <div className="svc-check" style={{ background: SERVICES[0].colorDim, color: SERVICES[0].color }}>
                      <IconCheck />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Mock */}
            <div className="service-visual" data-emoji="📦">
              <div>
                <div className="visual-top">
                  <span className="visual-title">Stok Overview</span>
                  <span className="visual-status"><span className="status-dot" />Live</span>
                </div>
                <div className="mock-bars">
                  {[
                    { label: 'Oli Mesin', pct: 82, val: '120L' },
                    { label: 'Sparepart', pct: 14, val: '5 unit' },
                    { label: 'Tali Tambat', pct: 0,  val: '0m' },
                    { label: 'Cat Kapal',   pct: 55, val: '30kg' },
                    { label: 'BBM Drum',    pct: 41, val: '7 drum' },
                  ].map((b) => (
                    <div key={b.label} className="mock-bar">
                      <span className="mock-bar-label">{b.label}</span>
                      <div className="mock-bar-track">
                        <div className="mock-bar-fill" style={{ width: `${b.pct}%`, background: b.pct < 20 ? '#e05252' : 'linear-gradient(90deg, #c9a84c, #e8c97a)' }} />
                      </div>
                      <span className="mock-bar-val">{b.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tracking Kapal */}
      <section className="service-block">
        <div className="container">
          <div className="service-inner reverse">
            <div>
              <div
                className="service-label"
                style={{ background: SERVICES[1].colorDim, borderColor: SERVICES[1].colorBorder, color: SERVICES[1].color }}
              >
                <span>🚢</span> {SERVICES[1].label}
              </div>
              <h2 className="service-title">{SERVICES[1].title}</h2>
              <p className="service-subtitle">{SERVICES[1].subtitle}</p>
              <div className="gold-line" />
              <p className="service-desc">{SERVICES[1].desc}</p>
              <ul className="service-features">
                {SERVICES[1].features.map((f) => (
                  <li key={f} className="svc-feat">
                    <div className="svc-check" style={{ background: SERVICES[1].colorDim, color: SERVICES[1].color }}>
                      <IconCheck />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Mock */}
            <div className="service-visual" data-emoji="🚢">
              <div>
                <div className="visual-top">
                  <span className="visual-title">KM. Lautan Mas</span>
                  <span className="visual-status"><span className="status-dot" />Berlayar</span>
                </div>
                <div className="mock-route">
                  {[
                    { label: 'Tanjung Perak, Surabaya', time: 'Berangkat 08.00', status: 'done' },
                    { label: 'Perairan Jawa Tengah',   time: 'Posisi saat ini', status: 'active' },
                    { label: 'Tanjung Priok, Jakarta', time: 'ETA 21.30 WIB',  status: 'pending' },
                  ].map((r) => (
                    <div key={r.label} className="route-point">
                      <div className={`route-dot ${r.status}`} />
                      <div>
                        <div className="route-label">{r.label}</div>
                        <div className="route-time">{r.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24, padding: '14px', background: 'rgba(14,165,184,0.06)', borderRadius: 10, border: '1px solid rgba(14,165,184,0.15)' }}>
                  <div style={{ fontSize: 12, color: '#6b7e9a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Muatan</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, color: '#b8c4d4' }}>1.200 ton kargo</span>
                    <span style={{ fontSize: 12, color: '#0ea5b8', fontWeight: 600 }}>85% penuh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Surat Jalan */}
      <section className="service-block">
        <div className="container">
          <div className="service-inner">
            <div>
              <div
                className="service-label"
                style={{ background: SERVICES[2].colorDim, borderColor: SERVICES[2].colorBorder, color: SERVICES[2].color }}
              >
                <span>📄</span> {SERVICES[2].label}
              </div>
              <h2 className="service-title">{SERVICES[2].title}</h2>
              <p className="service-subtitle">{SERVICES[2].subtitle}</p>
              <div className="gold-line" />
              <p className="service-desc">{SERVICES[2].desc}</p>
              <ul className="service-features">
                {SERVICES[2].features.map((f) => (
                  <li key={f} className="svc-feat">
                    <div className="svc-check" style={{ background: SERVICES[2].colorDim, color: SERVICES[2].color }}>
                      <IconCheck />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Mock */}
            <div className="service-visual" data-emoji="📄">
              <div>
                <div className="visual-top">
                  <span className="visual-title">Surat Jalan Digital</span>
                  <span className="visual-status" style={{ color: '#7c6af5' }}><span className="status-dot" style={{ background: '#7c6af5', boxShadow: '0 0 8px rgba(124,106,245,0.4)' }} />Terverifikasi</span>
                </div>
                <div className="mock-doc">
                  <div className="mock-doc-header">
                    <span className="mock-doc-id">#SJ-2026-042</span>
                    <span className="mock-doc-badge">✓ Valid</span>
                  </div>
                  {[
                    { key: 'Pengirim',  val: 'PT Kargo Nusa' },
                    { key: 'Penerima',  val: 'PT Dermaga Prima' },
                    { key: 'Kapal',     val: 'KM. Helvetia' },
                    { key: 'Muatan',    val: '24 kontainer' },
                    { key: 'Tgl. Kirim',val: '28 Apr 2026' },
                  ].map((r) => (
                    <div key={r.key} className="mock-doc-row">
                      <span className="mock-doc-key">{r.key}</span>
                      <span className="mock-doc-val">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════ */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header center" style={{ marginBottom: 48 }}>
            <span className="badge badge-gold">Harga</span>
            <h2 className="display-md" style={{ marginTop: 14, color: '#f5f7fa' }}>Transparan, Tanpa Kejutan</h2>
            <div className="gold-line center" />
          </div>

          <div className="pricing-grid">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}>
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">{plan.price}</div>
                <div className="pricing-period">{plan.period}</div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing-feat">
                      <div className="pricing-feat-check"><IconCheck /></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`btn ${plan.highlight ? 'btn-gold' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}