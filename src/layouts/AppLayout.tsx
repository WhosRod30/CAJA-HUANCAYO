import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'

const navigation: { to: string; name: string; icon: IconName }[] = [
  { to: '/caja-virtual', name: 'Inicio', icon: 'home' },
  { to: '/transferencias', name: 'Transferencias', icon: 'transfer' },
  { to: '/movimientos', name: 'Mis movimientos', icon: 'history' },
  { to: '/destinatarios', name: 'Destinatarios', icon: 'users' },
]

export function AppLayout() {
  const { pathname } = useLocation()
  const section =
    navigation.find((item) => pathname.startsWith(item.to))?.name ?? 'Ayuda'

  useEffect(() => {
    document.title = `${section} | Caja Huancayo · Prototipo académico`
    document.getElementById('main-content')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, section])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <header className="brand-header">
        <NavLink
          className="wordmark"
          to="/"
          aria-label="Caja Huancayo, página principal"
        >
          Caja Huancayo<span>CAJA VIRTUAL</span>
        </NavLink>
        <div className="header-right">
          <span className="academic-label">
            Prototipo académico — No oficial
          </span>
          <span className="header-divider" />
          <NavLink to="/" className="header-session portal-return">
            <Icon name="back" size={15} /> Página principal
          </NavLink>
        </div>
      </header>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="workspace-label">TU BANCA PERSONAL</div>
          <nav className="main-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.name}
                title={item.name}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'is-active' : ''}`
                }
              >
                <Icon name={item.icon} />
                <span>{item.name}</span>
                <Icon name="chevron" size={15} className="nav-chevron" />
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-note">
              <Icon name="shield" size={27} />
              <strong>Tu tranquilidad primero</strong>
              <p>
                Todas las operaciones de este prototipo usan dinero y datos
                ficticios.
              </p>
            </div>
            <NavLink
              to="/ayuda"
              aria-label="Centro de ayuda"
              title="Centro de ayuda"
              className={({ isActive }) =>
                `nav-item ${isActive ? 'is-active' : ''}`
              }
            >
              <Icon name="help" />
              <span>Centro de ayuda</span>
            </NavLink>
            <div className="sidebar-footer">Siempre cerca de ti.</div>
          </div>
        </aside>
        <div className="workspace">
          <div className="workspace-bar">
            <div className="breadcrumb">
              Caja Virtual <Icon name="chevron" size={13} />
              <span>{section}</span>
            </div>
            <div className="profile">
              <span className="profile-text">
                <strong>Valeria García</strong>
                <small>Perfil de ejemplo</small>
              </span>
              <span className="profile-avatar" aria-hidden="true">
                VG
              </span>
            </div>
          </div>
          <main id="main-content" tabIndex={-1}>
            <Outlet />
          </main>
          <footer className="page-footer">
            <span>© Caja Huancayo · Propuesta académica de UX/UI</span>
            <span>
              <Icon name="shield" size={14} /> Sin operaciones bancarias reales
            </span>
          </footer>
        </div>
      </div>
    </>
  )
}
