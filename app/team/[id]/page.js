// app/team/[id]/page.js — Dynamic Team Member Page (Server Component)
import Link from 'next/link'
import { notFound } from 'next/navigation'
import teamData from '../../../data/team.json'

// ── generateStaticParams ────────────────────────────────────
export async function generateStaticParams() {
  return teamData.map((member) => ({ id: member.id }))
}

// ── generateMetadata ────────────────────────────────────────
export async function generateMetadata({ params }) {
  const member = teamData.find((m) => m.id === params.id)
  if (!member) return { title: 'Anggota tidak ditemukan' }
  return {
    title: `${member.nama} — Tim ShipLog`,
    description: `${member.nama}, ${member.role} di ShipLog. ${member.bio}`,
  }
}

// ── Helper: get adjacent members ───────────────────────────
function getAdjacent(id) {
  const idx = teamData.findIndex((m) => m.id === id)
  return {
    prev: idx > 0 ? teamData[idx - 1] : null,
    next: idx < teamData.length - 1 ? teamData[idx + 1] : null,
  }
}

// ── Page Component ──────────────────────────────────────────
export default function TeamMemberPage({ params }) {
  const member = teamData.find((m) => m.id === params.id)
  if (!member) notFound()

  const { prev, next } = getAdjacent(params.id)
  const otherMembers = teamData.filter((m) => m.id !== params.id).slice(0, 3)

  return (
    <>
      <style>{`
        /* ── Back nav ── */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7e9a;
          margin-bottom: 36px;
        }

        .breadcrumb a {
          color: #6b7e9a;
          text-decoration: none;
          transition: color 0.18s;
        }

        .breadcrumb a:hover { color: #c9a84c; }
        .breadcrumb-sep { color: #2a3d5e; }
        .breadcrumb-current { color: #b8c4d4; }

        /* ── Profile Hero ── */
        .profile-hero {
          padding: 80px 0 72px;
          position: relative;
        }

        .profile-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          opacity: 0.35;
        }

        .profile-top {
          display: flex;
          align-items: flex-start;
          gap: 36px;
          flex-wrap: wrap;
        }

        /* Avatar */
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a2740, #1e2d4a);
          border: 3px solid rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 38px;
          color: #c9a84c;
          flex-shrink: 0;
          box-shadow: 0 0 40px rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.4);
        }

        .profile-info { flex: 1; }

        .profile-role-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 14px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #c9a84c;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .profile-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #f5f7fa;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .profile-role {
          font-size: 17px;
          color: #b8c4d4;
          font-weight: 400;
          margin-bottom: 20px;
        }

        .profile-email {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7e9a;
          padding: 7px 14px;
          background: #0c1527;
          border: 1px solid #1e2d4a;
          border-radius: 8px;
          font-family: 'DM Mono', monospace;
          transition: border-color 0.2s, color 0.2s;
          text-decoration: none;
        }

        .profile-email:hover {
          border-color: rgba(201,168,76,0.3);
          color: #c9a84c;
        }

        /* ── Profile Body ── */
        .profile-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
          margin-top: 56px;
        }

        .profile-card {
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 20px;
          padding: 36px;
          position: relative;
        }

        .profile-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
        }

        .card-section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 16px;
        }

        .bio-text {
          font-size: 16px;
          color: #b8c4d4;
          line-height: 1.85;
        }

        /* Skills */
        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 10px;
          transition: background 0.18s, border-color 0.18s;
        }

        .skill-item:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.2);
        }

        .skill-dot {
          width: 8px;
          height: 8px;
          background: #c9a84c;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(201,168,76,0.4);
        }

        .skill-name {
          font-size: 14px;
          color: #b8c4d4;
          font-weight: 500;
        }

        /* Stats in sidebar */
        .profile-stat {
          padding: 16px 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(30,45,74,0.6);
          border-radius: 12px;
          text-align: center;
          margin-bottom: 12px;
        }

        .profile-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 4px;
        }

        .profile-stat-label {
          font-size: 12px;
          color: #6b7e9a;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ── Navigation ── */
        .member-nav {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid rgba(30,45,74,0.5);
        }

        .member-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 14px;
          text-decoration: none;
          flex: 1;
          max-width: 260px;
          transition: border-color 0.2s, transform 0.2s;
        }

        .member-nav-link:hover {
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-2px);
        }

        .member-nav-link.right { flex-direction: row-reverse; margin-left: auto; }

        .nav-link-dir {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #6b7e9a;
          margin-bottom: 3px;
        }

        .nav-link-name {
          font-size: 14px;
          font-weight: 600;
          color: #f5f7fa;
        }

        .nav-link-role {
          font-size: 12px;
          color: #6b7e9a;
        }

        .nav-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a2740, #1e2d4a);
          border: 1.5px solid rgba(201,168,76,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 14px;
          color: #c9a84c;
          flex-shrink: 0;
        }

        /* ── Other Members ── */
        .others-section {
          margin-top: 72px;
        }

        .others-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #f5f7fa;
          margin-bottom: 24px;
        }

        .others-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .other-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: #131d35;
          border: 1px solid #1e2d4a;
          border-radius: 14px;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s;
        }

        .other-card:hover {
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-2px);
        }

        .other-av {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a2740, #1e2d4a);
          border: 1.5px solid rgba(201,168,76,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 15px;
          color: #c9a84c;
          flex-shrink: 0;
        }

        .other-name { font-size: 14px; font-weight: 600; color: #f5f7fa; margin-bottom: 2px; }
        .other-role { font-size: 12px; color: #6b7e9a; }

        @media (max-width: 860px) {
          .profile-grid { grid-template-columns: 1fr; }
          .others-grid { grid-template-columns: 1fr; }
          .member-nav { flex-direction: column; }
          .member-nav-link.right { margin-left: 0; }
          .member-nav-link { max-width: 100%; }
        }
      `}</style>

      <section className="profile-hero">
        <div className="container">

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/about">Tim</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{member.nama}</span>
          </div>

          {/* Profile Top */}
          <div className="profile-top">
            <div className="profile-avatar">{member.avatar}</div>
            <div className="profile-info">
              <span className="profile-role-badge">Anggota Tim</span>
              <h1 className="profile-name">{member.nama}</h1>
              <p className="profile-role">{member.role}</p>
              <a href={`mailto:${member.kontak}`} className="profile-email">
                ✉ {member.kontak}
              </a>
            </div>
          </div>

          {/* Profile Body */}
          <div className="profile-grid">

            {/* Bio */}
            <div className="profile-card">
              <div className="card-section-title">Tentang</div>
              <div className="gold-line" style={{ marginTop: 0, marginBottom: 20 }} />
              <p className="bio-text">{member.bio}</p>
            </div>

            {/* Sidebar */}
            <div>
              {/* Skills */}
              <div className="profile-card" style={{ marginBottom: 20 }}>
                <div className="card-section-title">Keahlian</div>
                <div className="skills-list" style={{ marginTop: 16 }}>
                  {member.keahlian.map((skill) => (
                    <div key={skill} className="skill-item">
                      <div className="skill-dot" />
                      <span className="skill-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="profile-card">
                <div className="card-section-title">Di ShipLog</div>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="profile-stat">
                    <div className="profile-stat-num">3+</div>
                    <div className="profile-stat-label">Tahun Bergabung</div>
                  </div>
                  <div className="profile-stat">
                    <div className="profile-stat-num">{member.keahlian.length}</div>
                    <div className="profile-stat-label">Keahlian Utama</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Member Navigation */}
          <div className="member-nav">
            {prev ? (
              <Link href={`/team/${prev.id}`} className="member-nav-link">
                <div className="nav-avatar">{prev.avatar}</div>
                <div>
                  <div className="nav-link-dir">← Sebelumnya</div>
                  <div className="nav-link-name">{prev.nama}</div>
                  <div className="nav-link-role">{prev.role}</div>
                </div>
              </Link>
            ) : <div />}

            {next && (
              <Link href={`/team/${next.id}`} className="member-nav-link right">
                <div className="nav-avatar">{next.avatar}</div>
                <div style={{ textAlign: 'right' }}>
                  <div className="nav-link-dir">Berikutnya →</div>
                  <div className="nav-link-name">{next.nama}</div>
                  <div className="nav-link-role">{next.role}</div>
                </div>
              </Link>
            )}
          </div>

          {/* Other Members */}
          <div className="others-section">
            <div className="others-title">Anggota Lainnya</div>
            <div className="others-grid">
              {otherMembers.map((m) => (
                <Link key={m.id} href={`/team/${m.id}`} className="other-card">
                  <div className="other-av">{m.avatar}</div>
                  <div>
                    <div className="other-name">{m.nama}</div>
                    <div className="other-role">{m.role}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}