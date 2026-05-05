'use client'
// app/contact/page.js — Contact Page (Client Component)
import { useState } from 'react'
import Link from 'next/link'

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'hello@shiplog.id', href: 'mailto:hello@shiplog.id' },
  { icon: '📞', label: 'Telepon', value: '+62 21 000 0000', href: 'tel:+6221000000' },
  { icon: '📍', label: 'Kantor', value: 'Jl. Pelabuhan No. 1, Tanjung Priok, Jakarta Utara' },
  { icon: '🕐', label: 'Jam Kerja', value: 'Senin – Jumat, 08.00 – 17.00 WIB' },
]

const REASONS = [
  'Demo produk ShipLog',
  'Pertanyaan harga & paket',
  'Integrasi sistem',
  'Support teknis',
  'Partnership & kerja sama',
  'Lainnya',
]

export default function ContactPage() {
  const [form, setForm] = useState({ nama: '', email: '', perusahaan: '', alasan: '', pesan: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const validate = () => {
    const e = {}
    if (!form.nama.trim())  e.nama  = 'Nama wajib diisi'
    if (!form.email.trim()) e.email = 'Email wajib diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid'
    if (!form.pesan.trim()) e.pesan = 'Pesan wajib diisi'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')

    // Simulasi pengiriman (console.log + delay)
    console.log('📬 Form Contact ShipLog:', form)

    setTimeout(() => {
      setStatus('success')
      setForm({ nama: '', email: '', perusahaan: '', alasan: '', pesan: '' })
    }, 1200)
  }

  return (
    <>
      <style>{`
        /* ── Page ── */
        .contact-page {
          padding: 96px 0 80px;
          position: relative;
        }

        .contact-page::before {
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
          margin-bottom: 14px;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4.5vw, 3.6rem);
          font-weight: 800;
          color: #f5f7fa;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .page-desc {
          font-size: 17px;
          color: #b8c4d4;
          max-width: 480px;
          line-height: 1.8;
          margin-bottom: 48px;
        }

        /* ── Grid ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Info Side ── */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }

        .contact-info-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 14px;
          transition: border-color 0.2s;
        }

        .contact-info-card:hover { border-color: rgba(201,168,76,0.25); }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1.5;
        }

        .info-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #6b7e9a;
          margin-bottom: 4px;
        }

        .info-val {
          font-size: 14px;
          color: #b8c4d4;
          line-height: 1.5;
        }

        .info-val a {
          color: #c9a84c;
          text-decoration: none;
          transition: color 0.18s;
        }

        .info-val a:hover { color: #e8c97a; }

        /* ── Form Card ── */
        .form-card {
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          padding: 40px 36px;
          position: relative;
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          opacity: 0.6;
        }

        .form-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #f5f7fa;
          margin-bottom: 24px;
        }

        /* Form elements */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #6b7e9a;
          margin-bottom: 8px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px 14px;
          background: #0a0f1e;
          border: 1.5px solid #1e2d4a;
          border-radius: 10px;
          color: #f5f7fa;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input::placeholder,
        .form-textarea::placeholder { color: #2a3d5e; }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
        }

        .form-input.err,
        .form-textarea.err { border-color: #e05252; }

        .form-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7e9a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }

        .form-select option { background: #0f172a; }

        .form-textarea {
          resize: vertical;
          min-height: 130px;
        }

        .err-msg {
          font-size: 12px;
          color: #e05252;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: #0a0f1e;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.35);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Success State */
        .success-card {
          text-align: center;
          padding: 56px 32px;
        }

        .success-icon {
          width: 72px;
          height: 72px;
          background: rgba(14,165,184,0.1);
          border: 2px solid rgba(14,165,184,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 24px;
          animation: scaleIn 0.4s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .success-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #f5f7fa;
          margin-bottom: 12px;
        }

        .success-desc {
          font-size: 15px;
          color: #6b7e9a;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* Spinner */
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(10,15,30,0.3);
          border-top-color: #0a0f1e;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .form-card { padding: 28px 22px; }
        }
      `}</style>

      <section className="contact-page">
        <div className="container">
          <p className="eyebrow">✉ Kontak</p>
          <h1 className="page-title">
            Mari Bicara<br />Soal Bisnis Anda
          </h1>
          <div className="gold-line" />
          <p className="page-desc">
            Tim kami siap membantu Anda menemukan solusi yang tepat.
            Isi form atau hubungi kami langsung.
          </p>

          <div className="contact-grid">

            {/* ── Info Side ── */}
            <div>
              <div className="contact-info">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="contact-info-card">
                    <div className="info-icon">{item.icon}</div>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-val">
                        {item.href ? (
                          <a href={item.href}>{item.value}</a>
                        ) : (
                          item.value
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div style={{ padding: '24px', background: '#0c1527', border: '1px solid #1e2d4a', borderRadius: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6b7e9a', marginBottom: 14 }}>
                  Navigasi Cepat
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: '→ Lihat semua layanan', href: '/services' },
                    { label: '→ Kenali tim kami', href: '/about' },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      style={{ fontSize: 14, color: '#c9a84c', textDecoration: 'none', fontWeight: 500, transition: 'color 0.18s' }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Form Side ── */}
            <div>
              {status === 'success' ? (
                <div className="form-card">
                  <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h2 className="success-title">Pesan Terkirim!</h2>
                    <p className="success-desc">
                      Terima kasih, <strong style={{ color: '#b8c4d4' }}>{form.nama || 'Anda'}</strong>.<br />
                      Tim ShipLog akan menghubungi Anda dalam 1×24 jam kerja.
                    </p>
                    <button
                      className="btn btn-outline"
                      onClick={() => setStatus(null)}
                      style={{ margin: '0 auto' }}
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-card">
                  <h2 className="form-card-title">Kirim Pesan</h2>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="nama">Nama Lengkap *</label>
                        <input
                          id="nama"
                          name="nama"
                          type="text"
                          className={`form-input ${errors.nama ? 'err' : ''}`}
                          placeholder="Budi Santoso"
                          value={form.nama}
                          onChange={handleChange}
                        />
                        {errors.nama && <div className="err-msg">⚠ {errors.nama}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={`form-input ${errors.email ? 'err' : ''}`}
                          placeholder="budi@perusahaan.id"
                          value={form.email}
                          onChange={handleChange}
                        />
                        {errors.email && <div className="err-msg">⚠ {errors.email}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="perusahaan">Nama Perusahaan</label>
                      <input
                        id="perusahaan"
                        name="perusahaan"
                        type="text"
                        className="form-input"
                        placeholder="PT. Maju Bersama"
                        value={form.perusahaan}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="alasan">Keperluan</label>
                      <select
                        id="alasan"
                        name="alasan"
                        className="form-select"
                        value={form.alasan}
                        onChange={handleChange}
                      >
                        <option value="">Pilih keperluan...</option>
                        {REASONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="pesan">Pesan *</label>
                      <textarea
                        id="pesan"
                        name="pesan"
                        className={`form-textarea ${errors.pesan ? 'err' : ''}`}
                        placeholder="Ceritakan kebutuhan logistik Anda..."
                        value={form.pesan}
                        onChange={handleChange}
                      />
                      {errors.pesan && <div className="err-msg">⚠ {errors.pesan}</div>}
                    </div>

                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="spinner" />
                          Mengirim...
                        </>
                      ) : (
                        'Kirim Pesan →'
                      )}
                    </button>

                    <p style={{ fontSize: 12, color: '#6b7e9a', textAlign: 'center', marginTop: 14 }}>
                      Dengan mengirim form ini, Anda menyetujui kebijakan privasi ShipLog.
                    </p>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}