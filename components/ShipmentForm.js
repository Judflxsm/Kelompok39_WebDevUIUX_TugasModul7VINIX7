'use client'
// components/ShipmentForm.js
// Form tambah shipment — Client Component
// Menggunakan useActionState() (React 19 / Next.js 14+) + useFormStatus()

import { useActionState, useEffect, useRef, useState } from 'react'
import { createShipment } from '../app/actions/shipmentActions'
import SubmitButton from './SubmitButton'
import Notification from './Notification'

// Status pengiriman beserta warna badge
const STATUS_OPTIONS = [
  { value: '',          label: 'Pilih status...',   disabled: true },
  { value: 'menunggu',  label: '⏳ Menunggu'  },
  { value: 'berlayar',  label: '⛵ Berlayar'  },
  { value: 'tiba',      label: '⚓ Tiba'      },
  { value: 'selesai',   label: '✅ Selesai'   },
]

const PELABUHAN_SUGGESTIONS = [
  'Tanjung Priok, Jakarta',
  'Tanjung Perak, Surabaya',
  'Belawan, Medan',
  'Makassar, Sulsel',
  'Balikpapan, Kaltim',
  'Bitung, Sulut',
  'Sorong, Papua Barat',
  'Ambon, Maluku',
]

// Initial state untuk useActionState
const INIT_STATE = {
  success: false,
  errors: {},
  message: '',
  data: null,
}

export default function ShipmentForm({ onSuccess }) {
  const [state, formAction] = useActionState(createShipment, INIT_STATE)
  const [showNotif, setShowNotif] = useState(false)
  const formRef = useRef(null)

  // Reaksi terhadap perubahan state setelah submit
  useEffect(() => {
    if (!state.message) return

    setShowNotif(true)

    // Reset form jika berhasil
    if (state.success) {
      formRef.current?.reset()
      onSuccess?.()
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        /* ── Form Card ── */
        .sf-card {
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }

        .sf-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0ea5b8, #c9a84c, transparent);
        }

        .sf-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #f5f7fa;
          margin-bottom: 6px;
        }

        .sf-subtitle {
          font-size: 14px;
          color: #6b7e9a;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        /* ── Form Groups ── */
        .sf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .sf-group {
          margin-bottom: 18px;
        }

        .sf-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #6b7e9a;
          margin-bottom: 8px;
        }

        .sf-label .required {
          color: #e05252;
          font-size: 14px;
          line-height: 1;
        }

        .sf-input,
        .sf-select,
        .sf-textarea {
          width: 100%;
          padding: 12px 14px;
          background: #0a0f1e;
          border: 1.5px solid #1e2d4a;
          border-radius: 10px;
          color: #f5f7fa;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          display: block;
        }

        .sf-input::placeholder,
        .sf-textarea::placeholder {
          color: #2a3d5e;
        }

        .sf-input:focus,
        .sf-select:focus,
        .sf-textarea:focus {
          border-color: #0ea5b8;
          box-shadow: 0 0 0 3px rgba(14,165,184,0.1);
          background: #0c1220;
        }

        .sf-input.sf-err,
        .sf-select.sf-err,
        .sf-textarea.sf-err {
          border-color: #e05252;
          box-shadow: 0 0 0 3px rgba(224,82,82,0.08);
        }

        .sf-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7e9a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-color: #0a0f1e;
          padding-right: 36px;
        }

        .sf-select option {
          background: #0f172a;
          color: #f5f7fa;
        }

        .sf-textarea {
          resize: vertical;
          min-height: 90px;
        }

        /* Error message per field */
        .sf-field-err {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #e05252;
          margin-top: 6px;
          font-weight: 500;
        }

        /* Hint text */
        .sf-hint {
          font-size: 11.5px;
          color: #2a3d5e;
          margin-top: 5px;
        }

        /* Datalist suggestion style — browser handled, just note */
        input[list]::-webkit-calendar-picker-indicator {
          display: none;
        }

        /* Divider */
        .sf-divider {
          height: 1px;
          background: rgba(30,45,74,0.6);
          margin: 24px 0;
        }

        /* Required note */
        .sf-required-note {
          font-size: 12px;
          color: #2a3d5e;
          margin-top: 8px;
          text-align: right;
        }

        @media (max-width: 600px) {
          .sf-row { grid-template-columns: 1fr; }
          .sf-card { padding: 24px 20px; }
        }
      `}</style>

      {/* Datalist for autocomplete suggestions */}
      <datalist id="pelabuhan-list">
        {PELABUHAN_SUGGESTIONS.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>

      <div className="sf-card">
        <h2 className="sf-title">Tambah Shipment Baru</h2>
        <p className="sf-subtitle">
          Catat pengiriman kapal baru ke dalam sistem ShipLog.
          Data akan langsung tersinkronisasi ke dashboard.
        </p>

        {/* Notification — muncul di atas form setelah submit */}
        <Notification
          message={state.message}
          type={state.success ? 'success' : state.message ? 'error' : 'info'}
          show={showNotif}
          onClose={() => setShowNotif(false)}
          autoDismiss={6000}
        />

        {/* ── FORM ── */}
        <form action={formAction} ref={formRef} noValidate>

          {/* Nama Kapal */}
          <div className="sf-group">
            <label className="sf-label" htmlFor="nama_kapal">
              Nama Kapal <span className="required">*</span>
            </label>
            <input
              id="nama_kapal"
              name="nama_kapal"
              type="text"
              className={`sf-input ${state.errors?.nama_kapal ? 'sf-err' : ''}`}
              placeholder="KM. Lautan Mas"
              maxLength={100}
              autoComplete="off"
            />
            {state.errors?.nama_kapal && (
              <div className="sf-field-err">⚠ {state.errors.nama_kapal}</div>
            )}
          </div>

          {/* Asal & Tujuan */}
          <div className="sf-row">
            <div className="sf-group">
              <label className="sf-label" htmlFor="asal">
                Pelabuhan Asal <span className="required">*</span>
              </label>
              <input
                id="asal"
                name="asal"
                type="text"
                list="pelabuhan-list"
                className={`sf-input ${state.errors?.asal ? 'sf-err' : ''}`}
                placeholder="Tanjung Priok, Jakarta"
                maxLength={100}
                autoComplete="off"
              />
              {state.errors?.asal ? (
                <div className="sf-field-err">⚠ {state.errors.asal}</div>
              ) : (
                <div className="sf-hint">Ketik untuk saran pelabuhan</div>
              )}
            </div>

            <div className="sf-group">
              <label className="sf-label" htmlFor="tujuan">
                Pelabuhan Tujuan <span className="required">*</span>
              </label>
              <input
                id="tujuan"
                name="tujuan"
                type="text"
                list="pelabuhan-list"
                className={`sf-input ${state.errors?.tujuan ? 'sf-err' : ''}`}
                placeholder="Tanjung Perak, Surabaya"
                maxLength={100}
                autoComplete="off"
              />
              {state.errors?.tujuan && (
                <div className="sf-field-err">⚠ {state.errors.tujuan}</div>
              )}
            </div>
          </div>

          {/* Status & Muatan */}
          <div className="sf-row">
            <div className="sf-group">
              <label className="sf-label" htmlFor="status">
                Status <span className="required">*</span>
              </label>
              <select
                id="status"
                name="status"
                className={`sf-select ${state.errors?.status ? 'sf-err' : ''}`}
                defaultValue=""
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {state.errors?.status && (
                <div className="sf-field-err">⚠ {state.errors.status}</div>
              )}
            </div>

            <div className="sf-group">
              <label className="sf-label" htmlFor="muatan">
                Muatan (Ton)
              </label>
              <input
                id="muatan"
                name="muatan"
                type="number"
                className={`sf-input ${state.errors?.muatan ? 'sf-err' : ''}`}
                placeholder="1200"
                min="0"
                step="0.1"
              />
              {state.errors?.muatan ? (
                <div className="sf-field-err">⚠ {state.errors.muatan}</div>
              ) : (
                <div className="sf-hint">Opsional — kapasitas dalam ton</div>
              )}
            </div>
          </div>

          {/* Keterangan */}
          <div className="sf-group">
            <label className="sf-label" htmlFor="keterangan">
              Keterangan
            </label>
            <textarea
              id="keterangan"
              name="keterangan"
              className="sf-textarea"
              placeholder="Informasi tambahan seperti jenis muatan, nomor manifest, dll..."
              maxLength={500}
            />
            <div className="sf-hint">Maks. 500 karakter (opsional)</div>
          </div>

          <div className="sf-divider" />

          {/* Submit */}
          <SubmitButton
            label="Tambah Shipment →"
            loadingLabel="Menyimpan ke database..."
            variant="gold"
          />

          <p className="sf-required-note">
            <span style={{ color: '#e05252' }}>*</span> Wajib diisi
          </p>
        </form>
      </div>
    </>
  )
}