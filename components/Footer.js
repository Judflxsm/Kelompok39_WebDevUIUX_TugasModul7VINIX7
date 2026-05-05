// components/Footer.js — Server Component
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <style>{`
        .footer {
          background: #080c18;
          border-top: 1px solid #1e2d4a;
          padding: 56px 0 0;
          margin-top: auto;
        }

        .footer-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-brand {}

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          text-decoration: none;
        }

        .footer-logo-mark {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 15px;
          color: #0a0f1e;
        }

        .footer-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #f5f7fa;
        }

        .footer-logo-text span { color: #c9a84c; }

        .footer-desc {
          font-size: 14px;
          color: #6b7e9a;
          line-height: 1.8;
          max-width: 260px;
          margin-bottom: 20px;
        }

        .footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 999px;
          font-size: 12px;
          color: #c9a84c;
          font-weight: 500;
        }

        .footer-col-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #f5f7fa;
          margin-bottom: 20px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          font-size: 14px;
          color: #6b7e9a;
          text-decoration: none;
          transition: color 0.18s;
        }

        .footer-links a:hover { color: #c9a84c; }

        .footer-bottom {
          border-top: 1px solid rgba(30,45,74,0.7);
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-copy {
          font-size: 13px;
          color: #6b7e9a;
        }

        .footer-copy span {
          color: #c9a84c;
        }

        .footer-legal {
          display: flex;
          gap: 20px;
        }

        .footer-legal a {
          font-size: 13px;
          color: #6b7e9a;
          text-decoration: none;
          transition: color 0.18s;
        }

        .footer-legal a:hover { color: #f5f7fa; }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }

        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">

            {/* Brand Column */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <div className="footer-logo-mark">S</div>
                <span className="footer-logo-text">Ship<span>Log</span></span>
              </Link>
              <p className="footer-desc">
                Platform SaaS manajemen logistik perkapalan modern. Dari dermaga ke dashboard, semua terhubung.
              </p>
              <div className="footer-badge">
                <span>●</span> Sistem Aktif 24/7
              </div>
            </div>

            {/* Produk */}
            <div>
              <div className="footer-col-title">Produk</div>
              <ul className="footer-links">
                <li><Link href="/services">Monitoring Stok</Link></li>
                <li><Link href="/services">Tracking Kapal</Link></li>
                <li><Link href="/services">Surat Jalan Digital</Link></li>
                <li><Link href="/services">Laporan Otomatis</Link></li>
              </ul>
            </div>

            {/* Perusahaan */}
            <div>
              <div className="footer-col-title">Perusahaan</div>
              <ul className="footer-links">
                <li><Link href="/about">Tentang Kami</Link></li>
                <li><Link href="/about">Tim</Link></li>
                <li><Link href="/contact">Kontak</Link></li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <div className="footer-col-title">Hubungi Kami</div>
              <ul className="footer-links">
                <li><a href="mailto:hello@shiplog.id">hello@shiplog.id</a></li>
                <li><a href="tel:+6221000000">+62 21 000 0000</a></li>
                <li><a href="#">Jakarta, Indonesia</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {year} <span>ShipLog</span> by Kelompok 39 — Webdev UI/UX. Semua hak dilindungi.
            </p>
            <div className="footer-legal">
              <a href="#">Privasi</a>
              <a href="#">Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}