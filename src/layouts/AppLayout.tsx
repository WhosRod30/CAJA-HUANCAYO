import { useWebSession } from '../app/webSessionContext'
import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon'
import type { IconName } from '../components/Icon'

const navigation: { to: string; name: string; icon: IconName }[] = [
  { to: '/caja-virtual', name: 'Inicio', icon: 'home' },
  { to: '/transferencias', name: 'Transferencias', icon: 'transfer' },
  { to: '/pagos', name: 'Pagos', icon: 'receipt' },
  { to: '/movimientos', name: 'Mis movimientos', icon: 'history' },
  { to: '/destinatarios', name: 'Destinatarios', icon: 'users' },
  { to: '/ayuda', name: 'Centro de ayuda', icon: 'help' },
]

export function AppLayout() {
  const { signOut } = useWebSession()
  const { pathname } = useLocation()
  const section =
    navigation.find((item) => pathname.startsWith(item.to))?.name ?? 'Ayuda'

  useEffect(() => {
    const stepTitle: Record<string, string> = {
      '/transferencias/destinatario': 'Elegir destinatario', '/transferencias/monto': 'Monto de la transferencia', '/transferencias/revisar': 'Revisar transferencia', '/transferencias/procesando': 'Estado de la transferencia',
      '/pagos/detalle': 'Suministro del servicio', '/pagos/monto': 'Monto del pago', '/pagos/revisar': 'Revisar pago', '/pagos/procesando': 'Estado del pago', '/pagos/comprobante': 'Comprobante del pago',
    }
    const title = pathname.startsWith('/transferencias/comprobante/') ? 'Comprobante de transferencia' : stepTitle[pathname] ?? section
    document.title = `${title} | Caja Huancayo`
    const main = document.getElementById('main-content')
    const heading = main?.querySelector<HTMLElement>('[data-step-heading]') ?? main?.querySelector<HTMLElement>('h1')
    const target = heading ?? main
    target?.setAttribute('tabindex', '-1')
    target?.focus({ preventScroll: true })
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
          to="/inicio"
        >
          Caja Huancayo<span>CAJA VIRTUAL</span>
        </NavLink>
        <div className="header-right">
          <span className="header-divider" />
          <NavLink to="/inicio" className="header-session portal-return">
            <Icon name="back" size={15} /> Página principal
          </NavLink>
          <button className="web-session-logout" onClick={signOut}>Cerrar sesión</button>
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
                Revisa siempre el destinatario y el monto antes de confirmar.
              </p>
            </div>
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
            <span>© Caja Huancayo</span>
            <NavLink to="/accesibilidad">Accesibilidad</NavLink>
          </footer>
        </div>
      </div>
    </>
  )
}

