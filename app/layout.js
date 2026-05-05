// app/layout.js — Root Layout (Server Component)
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: {
    default: 'ShipLog — Logistik Perkapalan Modern',
    template: '%s | ShipLog',
  },
  description:
    'Platform SaaS manajemen logistik perkapalan. Monitoring stok, tracking kapal, dan surat jalan digital dalam satu dashboard.',
  keywords: ['logistik', 'perkapalan', 'SaaS', 'monitoring stok', 'tracking kapal'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Global grid background overlay */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}