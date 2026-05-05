'use client'
// components/Notification.js
// Komponen notifikasi reusable — support success, error, warning, info
// Auto-dismiss dengan timer (opsional)

import { useState, useEffect, useCallback } from 'react'

/**
 * @param {object}   props
 * @param {string}   props.message    - Teks pesan
 * @param {'success'|'error'|'warning'|'info'} props.type - Tipe notifikasi
 * @param {boolean}  props.show       - Tampilkan atau sembunyikan
 * @param {function} props.onClose    - Callback saat ditutup
 * @param {number}   props.autoDismiss - ms sebelum auto-dismiss (0 = manual)
 */
export default function Notification({
  message = '',
  type = 'info',
  show = false,
  onClose,
  autoDismiss = 5000,
}) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleClose = useCallback(() => {
    setAnimating(false)
    setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, 300)
  }, [onClose])

  useEffect(() => {
    if (show && message) {
      setVisible(true)
      // Delay sedikit agar animasi masuk terlihat
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
    } else {
      handleClose()
    }
  }, [show, message]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-dismiss
  useEffect(() => {
    if (!show || !autoDismiss) return
    const timer = setTimeout(handleClose, autoDismiss)
    return () => clearTimeout(timer)
  }, [show, autoDismiss, handleClose])

  if (!visible) return null

  const CONFIG = {
    success: {
      icon: '✓',
      iconBg: 'rgba(14,165,184,0.15)',
      iconColor: '#0ea5b8',
      borderColor: 'rgba(14,165,184,0.3)',
      bg: 'rgba(14,165,184,0.06)',
      barColor: '#0ea5b8',
      label: 'Berhasil',
    },
    error: {
      icon: '✕',
      iconBg: 'rgba(224,82,82,0.15)',
      iconColor: '#e05252',
      borderColor: 'rgba(224,82,82,0.3)',
      bg: 'rgba(224,82,82,0.06)',
      barColor: '#e05252',
      label: 'Error',
    },
    warning: {
      icon: '⚠',
      iconBg: 'rgba(201,168,76,0.15)',
      iconColor: '#c9a84c',
      borderColor: 'rgba(201,168,76,0.3)',
      bg: 'rgba(201,168,76,0.06)',
      barColor: '#c9a84c',
      label: 'Peringatan',
    },
    info: {
      icon: 'ℹ',
      iconBg: 'rgba(124,106,245,0.15)',
      iconColor: '#7c6af5',
      borderColor: 'rgba(124,106,245,0.3)',
      bg: 'rgba(124,106,245,0.06)',
      barColor: '#7c6af5',
      label: 'Info',
    },
  }

  const cfg = CONFIG[type] ?? CONFIG.info

  return (
    <>
      <style>{`
        .notif-wrapper {
          position: relative;
          border-radius: 12px;
          border: 1px solid;
          padding: 14px 44px 14px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .notif-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Progress bar bottom */
        .notif-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          border-radius: 0 0 12px 12px;
          animation: notifBar linear forwards;
        }

        @keyframes notifBar {
          from { width: 100%; }
          to   { width: 0%; }
        }

        .notif-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
          line-height: 1;
        }

        .notif-body { flex: 1; min-width: 0; }

        .notif-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .notif-msg {
          font-size: 14px;
          line-height: 1.55;
          color: #b8c4d4;
          word-break: break-word;
        }

        .notif-close {
          position: absolute;
          top: 10px; right: 10px;
          background: none;
          border: none;
          color: #6b7e9a;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.18s, background 0.18s;
        }

        .notif-close:hover {
          color: #f5f7fa;
          background: rgba(255,255,255,0.07);
        }
      `}</style>

      <div
        role="alert"
        aria-live="polite"
        className={`notif-wrapper ${animating ? 'visible' : ''}`}
        style={{
          background: cfg.bg,
          borderColor: cfg.borderColor,
        }}
      >
        {/* Icon */}
        <div
          className="notif-icon-box"
          style={{ background: cfg.iconBg, color: cfg.iconColor }}
        >
          {cfg.icon}
        </div>

        {/* Body */}
        <div className="notif-body">
          <div className="notif-label" style={{ color: cfg.iconColor }}>
            {cfg.label}
          </div>
          <p className="notif-msg">{message}</p>
        </div>

        {/* Close button */}
        <button
          className="notif-close"
          onClick={handleClose}
          aria-label="Tutup notifikasi"
          type="button"
        >
          ×
        </button>

        {/* Progress bar (hanya saat auto-dismiss) */}
        {autoDismiss > 0 && (
          <div
            className="notif-bar"
            style={{
              background: cfg.barColor,
              animationDuration: `${autoDismiss}ms`,
            }}
          />
        )}
      </div>
    </>
  )
}