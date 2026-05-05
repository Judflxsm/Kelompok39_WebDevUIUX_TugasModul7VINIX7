// app/dashboard/page.js — Dashboard Page (Server Component)
// Mengambil data dari Supabase secara langsung di server
// Menggabungkan ShipmentForm (Client) + ShipmentTable (Client)

import Link from 'next/link'
import { getShipments } from '../actions/shipmentActions'
import ShipmentForm from '../../components/ShipmentForm'
import ShipmentTable from '../../components/ShipmentTable'

export const metadata = {
  title: 'Dashboard Shipment',
  description: 'Kelola data pengiriman kapal ShipLog — tambah, pantau, dan update status shipment.',
}

// Revalidate setiap 30 detik untuk data fresh (opsional)
export const revalidate = 30

// ── Stat Card ──────────────────────────────────────────────
function StatCard({ label, value, icon, color = '#c9a84c', sub }) {
  return (
    <div style={{
      background: '#131d35',
      border: '1px solid #1e2d4a',
      borderRadius: '16px',
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      transition: 'transform 0.2s',
    }}>
      <div style={{
        width: '44px', height: '44px',
        background: `${color}18`,
        border: `1px solid ${color}30`,
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7e9a', marginBottom: '6px' }}>
          {label}
        </div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 800, color, lineHeight: 1 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: '12px', color: '#6b7e9a', marginTop: '5px' }}>{sub}</div>}
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────
export default async function DashboardPage() {
  // Data diambil di server — zero loading flicker
  const shipments = await getShipments()

  // Kalkulasi stats
  const total      = shipments.length
  const berlayar   = shipments.filter(s => s.status === 'berlayar').length
  const menunggu   = shipments.filter(s => s.status === 'menunggu').length
  const selesai    = shipments.filter(s => s.status === 'selesai').length
  const totalTon   = shipments.reduce((acc, s) => acc + (s.muatan_ton || 0), 0)

  return (
    <>
      <style>{`
        .dash-page {
          padding: 80px 0 100px;
          position: relative;
        }

        .dash-page::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #0ea5b8, #c9a84c, transparent);
          opacity: 0.4;
        }

        .dash-container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 28px;
        }

        /* Header */
        .dash-header {
          margin-bottom: 36px;
        }

        .dash-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0ea5b8;
          margin-bottom: 10px;
        }

        .dash-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #f5f7fa;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 10px;
        }

        .dash-desc {
          font-size: 15px;
          color: #6b7e9a;
          max-width: 540px;
          line-height: 1.7;
        }

        /* Stats grid */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }

        /* Main grid: form + table */
        .dash-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 28px;
          align-items: start;
        }

        /* Sticky form on desktop */
        .form-sticky {
          position: sticky;
          top: 88px;
        }

        /* Breadcrumb */
        .dash-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7e9a;
          margin-bottom: 24px;
        }

        .dash-breadcrumb a {
          color: #6b7e9a;
          text-decoration: none;
          transition: color 0.18s;
        }

        .dash-breadcrumb a:hover { color: #c9a84c; }
        .dash-breadcrumb-sep { color: #2a3d5e; }

        /* Live indicator */
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(14,165,184,0.08);
          border: 1px solid rgba(14,165,184,0.2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: #0ea5b8;
          margin-left: 12px;
          vertical-align: middle;
        }

        .live-dot {
          width: 7px; height: 7px;
          background: #0ea5b8;
          border-radius: 50%;
          animation: livePulse 1.5s infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }

        @media (max-width: 1024px) {
          .dash-grid { grid-template-columns: 1fr; }
          .form-sticky { position: static; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .dash-container { padding: 0 16px; }
          .dash-page { padding: 60px 0 80px; }
        }
      `}</style>

      <div className="dash-page">
        <div className="dash-container">

          {/* Breadcrumb */}
          <div className="dash-breadcrumb">
            <Link href="/">Home</Link>
            <span className="dash-breadcrumb-sep">/</span>
            <span>Dashboard</span>
          </div>

          {/* Header */}
          <div className="dash-header">
            <div className="dash-eyebrow">⚓ ShipLog Dashboard</div>
            <h1 className="dash-title">
              Manajemen Shipment
              <span className="live-badge">
                <span className="live-dot" />
                Live
              </span>
            </h1>
            <p className="dash-desc">
              Catat, pantau, dan kelola pengiriman kapal secara real-time.
              Data tersimpan langsung ke Supabase dan tersinkronisasi ke semua perangkat.
            </p>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <StatCard
              label="Total Shipment"
              value={total}
              icon="📋"
              color="#c9a84c"
              sub="semua status"
            />
            <StatCard
              label="Sedang Berlayar"
              value={berlayar}
              icon="⛵"
              color="#0ea5b8"
              sub={`${menunggu} menunggu`}
            />
            <StatCard
              label="Selesai"
              value={selesai}
              icon="✅"
              color="#22c55e"
              sub="pengiriman sukses"
            />
            <StatCard
              label="Total Muatan"
              value={totalTon > 0 ? `${totalTon.toLocaleString('id-ID')}t` : '—'}
              icon="⚖️"
              color="#7c6af5"
              sub="dalam ton"
            />
          </div>

          {/* Main Grid */}
          <div className="dash-grid">

            {/* Form - kiri (sticky di desktop) */}
            <div className="form-sticky">
              <ShipmentForm />
            </div>

            {/* Table - kanan */}
            <div>
              <ShipmentTable shipments={shipments} />
            </div>

          </div>

        </div>
      </div>
    </>
  )
}