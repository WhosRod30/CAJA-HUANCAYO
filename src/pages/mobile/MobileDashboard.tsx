import { Icon } from '../../components/Icon';
import { money } from '../../utils/format';

export function MobileDashboard() {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Modern High-End Header */}
      <div className="relative pt-12 pb-28 px-6 bg-[#0B0F19] overflow-hidden rounded-b-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-600/30 rounded-full mix-blend-screen filter blur-[80px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[60px] -translate-x-1/2 translate-y-1/4"></div>

        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(225,29,72,0.4)] border border-rose-300/30">
              M
            </div>
            <div>
              <p className="text-gray-400 text-[11px] font-medium tracking-wider uppercase">Buenas tardes</p>
              <h1 className="text-white text-lg font-bold">Milagros Alarcón</h1>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/10">
            <Icon name="search" size={20} className="text-white" />
          </button>
        </div>

        <div className="relative z-10 flex flex-col gap-1">
          <p className="text-gray-400 text-sm font-medium">Patrimonio total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-4xl font-extrabold tracking-tight">S/ 4,521</span>
            <span className="text-gray-400 text-xl font-medium">.42</span>
          </div>
        </div>
      </div>

      {/* Floating Action Cards */}
      <div className="px-6 -mt-14 relative z-20 mb-8 flex gap-4">
        <div className="flex-1 bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-3 active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
            <Icon name="transfer" size={22} />
          </div>
          <span className="font-semibold text-gray-800 text-sm">Enviar<br/>dinero</span>
        </div>
        <div className="flex-1 bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-3 active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Icon name="receipt" size={22} />
          </div>
          <span className="font-semibold text-gray-800 text-sm">Pagar<br/>servicios</span>
        </div>
      </div>

      {/* Tipo de Cambio Minimalista */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <Icon name="star" size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Tipo de cambio</p>
              <p className="text-gray-500 text-xs mt-0.5">Venta: 3.520</p>
            </div>
          </div>
          <button className="bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors">
            Cambiar
          </button>
        </div>
      </div>

      {/* Cuentas */}
      <div className="px-6 pb-6">
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-lg font-extrabold text-gray-900">Tus Cuentas</h2>
          <button className="text-rose-600 text-sm font-bold tracking-wide">Ver todas</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
                  <Icon name="wallet" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px]">Cuenta Independencia</h3>
                  <p className="text-gray-400 text-xs font-medium mt-0.5">•••• 6207</p>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{money(0)}</p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
                  <Icon name="history" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px]">Cuenta Mic. Empresa</h3>
                  <p className="text-gray-400 text-xs font-medium mt-0.5">•••• 7813</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-baseline gap-2">
              <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{money(4521.42)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
