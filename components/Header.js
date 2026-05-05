'use client'
// components/Header.js — Client Component (untuk mobile toggle)
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact',  label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: rgba(10, 15, 30, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(30, 45, 74, 0.8);
        }

        .header-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 28px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 16px;
          color: #0a0f1e;
          flex-shrink: 0;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #f5f7fa;
          letter-spacing: -0.01em;
        }

        .logo-text span {
          color: #c9a84c;
        }

        /* Desktop Nav */
        .nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          position: relative;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #b8c4d4;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
        }

        .nav-link:hover {
          color: #f5f7fa;
          background: rgba(255,255,255,0.06);
        }

        .nav-link.active {
          color: #c9a84c;
          background: rgba(201,168,76,0.1);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          background: #c9a84c;
          border-radius: 999px;
        }

        /* CTA Button */
        .nav-cta {
          margin-left: 12px;
          padding: 8px 20px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: #0a0f1e;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(201,168,76,0.35);
        }

        /* Mobile Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #b8c4d4;
          border-radius: 999px;
          transition: all 0.22s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
          background: #c9a84c;
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
          background: #c9a84c;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          background: rgba(10, 15, 30, 0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(30,45,74,0.8);
          padding: 20px 28px 28px;
          z-index: 998;
          animation: slideDown 0.22s ease;
        }

        .mobile-menu.open {
          display: block;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-link {
          display: block;
          padding: 14px 0;
          font-size: 16px;
          font-weight: 500;
          color: #b8c4d4;
          text-decoration: none;
          border-bottom: 1px solid rgba(30,45,74,0.5);
          transition: color 0.2s;
        }

        .mobile-nav-link:last-child {
          border-bottom: none;
        }

        .mobile-nav-link.active {
          color: #c9a84c;
        }

        .mobile-nav-link:hover {
          color: #f5f7fa;
        }

        .mobile-cta {
          display: block;
          margin-top: 16px;
          padding: 13px;
          text-align: center;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          color: #0a0f1e;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
        }

        @media (max-width: 720px) {
          .nav, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-mark">S</div>
            <span className="logo-text">Ship<span>Log</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="nav-cta">
            Mulai Gratis
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Mulai Gratis →
        </Link>
      </div>
    </>
  )
}