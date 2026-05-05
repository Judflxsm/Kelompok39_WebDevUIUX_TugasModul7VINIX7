'use client'
// components/SubmitButton.js
// Menggunakan useFormStatus() untuk otomatis disable & show loading
// saat form sedang disubmit (pending state dari React)

import { useFormStatus } from 'react-dom'

/**
 * @param {object} props
 * @param {string} props.label      - Teks tombol normal
 * @param {string} props.loadingLabel - Teks saat loading (opsional)
 * @param {'gold'|'teal'|'danger'} props.variant - Variant warna
 * @param {string} props.className  - Class tambahan
 */
export default function SubmitButton({
  label = 'Kirim',
  loadingLabel = 'Memproses...',
  variant = 'gold',
  className = '',
}) {
  // useFormStatus() otomatis baca pending state dari <form> parent-nya
  const { pending } = useFormStatus()

  const variantStyles = {
    gold: {
      background: pending
        ? 'rgba(201,168,76,0.5)'
        : 'linear-gradient(135deg, #c9a84c, #e8c97a)',
      color: '#0a0f1e',
      border: 'none',
    },
    teal: {
      background: pending
        ? 'rgba(14,165,184,0.4)'
        : 'linear-gradient(135deg, #0ea5b8, #06d6ea)',
      color: '#0a0f1e',
      border: 'none',
    },
    danger: {
      background: pending
        ? 'rgba(224,82,82,0.4)'
        : 'linear-gradient(135deg, #e05252, #f87171)',
      color: '#fff',
      border: 'none',
    },
  }

  return (
    <>
      <style>{`
        .submit-btn-shiplog {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
          letter-spacing: 0.01em;
        }

        .submit-btn-shiplog:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.3);
        }

        .submit-btn-shiplog:disabled {
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        /* Spinner */
        .btn-spinner {
          width: 17px;
          height: 17px;
          border: 2.5px solid rgba(10,15,30,0.25);
          border-top-color: #0a0f1e;
          border-radius: 50%;
          animation: btnSpin 0.65s linear infinite;
          flex-shrink: 0;
        }

        @keyframes btnSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <button
        type="submit"
        disabled={pending}
        className={`submit-btn-shiplog ${className}`}
        style={variantStyles[variant] ?? variantStyles.gold}
        aria-busy={pending}
        aria-label={pending ? loadingLabel : label}
      >
        {pending && <span className="btn-spinner" aria-hidden="true" />}
        {pending ? loadingLabel : label}
      </button>
    </>
  )
}