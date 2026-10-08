import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useEffect } from 'react';

export function MobileLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLogin = pathname === '/mobile/login';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="bg-gray-50 min-h-[100dvh] font-sans">
      <div className="w-full min-h-[100dvh] relative bg-white flex flex-col">
        {/* Área de contenido */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden relative ${!isLogin ? 'pb-32' : ''}`}>
          <Outlet />
        </div>

        {/* Bottom Navigation (Modern Floating Dock) */}
        {!isLogin && (
          <div className="fixed bottom-0 left-0 w-full px-4 pb-8 pt-4 pointer-events-none z-50 flex justify-center bg-gradient-to-t from-white via-white/80 to-transparent">
          <nav className="pointer-events-auto bg-white/90 backdrop-blur-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] px-6 py-4 flex justify-between items-center w-full max-w-[420px]">
            <NavLink
              to="/mobile/inicio"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-rose-600 scale-110' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon name="home" size={24} />
              <span className="text-[10px] font-bold tracking-wide">Inicio</span>
            </NavLink>

            <NavLink
              to="/mobile/transferencias"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-rose-600 scale-110' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon name="transfer" size={24} />
              <span className="text-[10px] font-bold tracking-wide">Transferir</span>
            </NavLink>

            {/* Botón flotante central (Acción principal) */}
            <div className="relative -top-8">
              <button onClick={() => navigate('/mobile/qr')} className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-[0_8px_20px_rgba(225,29,72,0.4)] active:scale-95 active:shadow-md transition-all duration-300 border-[6px] border-white">
                <Icon name="plus" size={28} />
              </button>
            </div>

            <NavLink
              to="/mobile/pagos"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-rose-600 scale-110' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon name="receipt" size={24} />
              <span className="text-[10px] font-bold tracking-wide">Pagos</span>
            </NavLink>

            <NavLink
              to="/mobile/prestamos"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-rose-600 scale-110' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon name="wallet" size={24} />
              <span className="text-[10px] font-bold tracking-wide">Préstamos</span>
            </NavLink>
          </nav>
        </div>
        )}
      </div>
    </div>
  );
}
