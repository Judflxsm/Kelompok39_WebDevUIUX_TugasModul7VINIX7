'use client'
// components/ShipmentTable.js
// Tabel shipments dengan aksi delete dan update status inline
// Semua aksi menggunakan Server Actions + useActionState

import { useActionState, useState } from 'react'
import { deleteShipment, updateShipmentStatus } from '../app/actions/shipmentActions'
import SubmitButton from './SubmitButton'

// ── Badge status ────────────────────────────────────────────
const STATUS_CONFIG = {
  menunggu: { label: 'Menunggu', color: '#c9a84c', bg: 'rgba(201,168,76,0.12)', border: 'rgba(201,168,76,0.25)' },
  berlayar: { label: 'Berlayar', color: '#0ea5b8', bg: 'rgba(14,165,184,0.12)', border: 'rgba(14,165,184,0.25)' },
  tiba:     { label: 'Tiba',     color: '#7c6af5', bg: 'rgba(124,106,245,0.12)', border: 'rgba(124,106,245,0.25)' },
  selesai:  { label: 'Selesai',  color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.25)' },
}

// ── Status Badge ────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: '#6b7e9a', bg: 'rgba(107,126,154,0.12)', border: 'rgba(107,126,154,0.25)' }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600,
      color: cfg.color,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  )
}

// ── Delete Row Form ─────────────────────────────────────────
function DeleteForm({ id }) {
  const [state, formAction] = useActionState(deleteShipment, { success: false, message: '' })

  const handleSubmit = (e) => {
    if (!window.confirm('Hapus shipment ini? Tindakan tidak dapat dibatalkan.')) {
      e.preventDefault()
    }
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Hapus"
        style={{
          background: 'none',
          border: '1px solid rgba(224,82,82,0.25)',
          borderRadius: '7px',
          color: '#e05252',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background 0.18s, border-color 0.18s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(224,82,82,0.12)'
          e.currentTarget.style.borderColor = 'rgba(224,82,82,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none'
          e.currentTarget.style.borderColor = 'rgba(224,82,82,0.25)'
        }}
      >
        ✕
      </button>
    </form>
  )
}

// ── Main Table Component ────────────────────────────────────
export default function ShipmentTable({ shipments = [] }) {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id)

  // Format tanggal ke Indonesia
  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <>
      <style>{`
        .st-card {
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          overflow: hidden;
        }

        .st-header {
          padding: 18px 24px;
          border-bottom: 1px solid #1e2d4a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .st-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f7fa;
        }

        .st-count {
          font-size: 12px;
          font-weight: 600;
          color: #6b7e9a;
          background: rgba(30,45,74,0.6);
          padding: 4px 12px;
          border-radius: 999px;
        }

        .st-wrap { overflow-x: auto; }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead tr { background: #0c1527; }

        th {
          padding: 11px 16px;
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6b7e9a;
          border-bottom: 1px solid #1e2d4a;
          white-space: nowrap;
        }

        td {
          padding: 13px 16px;
          border-bottom: 1px solid rgba(30,45,74,0.5);
          font-size: 13.5px;
          color: #b8c4d4;
          vertical-align: middle;
        }

        tbody tr:last-child td { border-bottom: none; }

        tbody tr {
          transition: background 0.18s;
        }

        tbody tr:hover { background: rgba(30,45,74,0.3); }

        .td-ship {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #f5f7fa;
          font-size: 14px;
          cursor: pointer;
        }

        .td-ship:hover { color: #c9a84c; }

        .td-mono {
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          color: #6b7e9a;
        }

        .td-route {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .route-arrow {
          color: #0ea5b8;
          font-size: 12px;
        }

        /* Expanded row */
        .expanded-row td {
          padding: 0;
          background: rgba(14,165,184,0.03);
        }

        .expanded-content {
          padding: 16px 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          border-top: 1px solid rgba(14,165,184,0.1);
        }

        .expanded-item {}
        .expanded-key {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #6b7e9a;
          margin-bottom: 4px;
        }
        .expanded-val {
          font-size: 13.5px;
          color: #b8c4d4;
          line-height: 1.5;
        }

        /* Action column */
        .action-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Empty state */
        .st-empty {
          text-align: center;
          padding: 56px 24px;
          color: #6b7e9a;
        }

        .st-empty-icon {
          font-size: 36px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .st-empty-text {
          font-size: 15px;
          margin-bottom: 6px;
        }

        .st-empty-sub {
          font-size: 13px;
          color: #2a3d5e;
        }
      `}</style>

      <div className="st-card">
        <div className="st-header">
          <div className="st-header-title">Daftar Shipment</div>
          <div className="st-count">{shipments.length} entri</div>
        </div>

        {shipments.length === 0 ? (
          <div className="st-empty">
            <div className="st-empty-icon">🚢</div>
            <div className="st-empty-text">Belum ada data shipment</div>
            <div className="st-empty-sub">Gunakan form di atas untuk menambahkan shipment pertama.</div>
          </div>
        ) : (
          <div className="st-wrap">
            <table>
              <thead>
                <tr>
                  <th>Kapal</th>
                  <th>Rute</th>
                  <th>Muatan</th>
                  <th>Status</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <>
                    <tr key={s.id}>
                      <td>
                        <span
                          className="td-ship"
                          onClick={() => toggleExpand(s.id)}
                          title="Klik untuk detail"
                        >
                          {s.nama_kapal}
                          {expandedId === s.id ? ' ▲' : ' ▼'}
                        </span>
                      </td>
                      <td>
                        <div className="td-route">
                          <span>{s.asal}</span>
                          <span className="route-arrow">→</span>
                          <span>{s.tujuan}</span>
                        </div>
                      </td>
                      <td className="td-mono">
                        {s.muatan_ton ? `${s.muatan_ton.toLocaleString('id-ID')} ton` : '—'}
                      </td>
                      <td>
                        <StatusBadge status={s.status} />
                      </td>
                      <td className="td-mono">{formatDate(s.created_at)}</td>
                      <td>
                        <div className="action-cell">
                          <DeleteForm id={s.id} />
                        </div>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expandedId === s.id && (
                      <tr key={`${s.id}-expanded`} className="expanded-row">
                        <td colSpan={6}>
                          <div className="expanded-content">
                            <div className="expanded-item">
                              <div className="expanded-key">ID Shipment</div>
                              <div className="expanded-val" style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#6b7e9a' }}>
                                {s.id}
                              </div>
                            </div>
                            <div className="expanded-item">
                              <div className="expanded-key">Keterangan</div>
                              <div className="expanded-val">{s.keterangan || '—'}</div>
                            </div>
                            {s.updated_at && (
                              <div className="expanded-item">
                                <div className="expanded-key">Terakhir Diperbarui</div>
                                <div className="expanded-val">{formatDate(s.updated_at)}</div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}