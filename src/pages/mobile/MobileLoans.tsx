import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { money } from '../../utils/format';

export function MobileLoans() {
  const [showPayModal, setShowPayModal] = useState(false);

  // Datos simulados del préstamo actual
  const loan = {
    type: 'Crédito Personal',
    totalAmount: 15000,
    paidAmount: 6500,
    remainingAmount: 8500,
    nextInstallment: 540.50,
    dueDate: '15 Oct 2026',
    totalInstallments: 24,
    paidInstallments: 10,
  };

  const progressPercentage = (loan.paidInstallments / loan.totalInstallments) * 100;

  return (
    <div className="bg-gray-50 min-h-full flex flex-col relative pb-20">
      {/* Header Premium */}
      <div className="bg-[#0B0F19] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[60px] translate-x-1/3 -translate-y-1/2"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Mis Préstamos</h1>
            <p className="text-emerald-400 text-sm font-medium">Gestión rápida y clara</p>
          </div>
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md">
            <Icon name="history" size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 -mt-16 relative z-20 space-y-6">
        
        {/* Tarjeta de Préstamo Activo */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Icon name="wallet" size={100} />
          </div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <Icon name="wallet" size={24} />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-gray-900">{loan.type}</h2>
                <p className="text-[13px] text-gray-500">Préstamo N° 0048291</p>
              </div>
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Al día
            </div>
          </div>

          <div className="mb-6 relative z-10">
            <p className="text-sm text-gray-500 font-medium mb-1">Deuda pendiente</p>
            <p className="text-4xl font-extrabold text-gray-900 tracking-tight">{money(loan.remainingAmount)}</p>
          </div>

          {/* Progress Bar (Visibilidad del Estado - Heurística 1) */}
          <div className="mb-6 relative z-10">
            <div className="flex justify-between text-[13px] font-bold mb-2">
              <span className="text-emerald-600">{loan.paidInstallments} Pagadas</span>
              <span className="text-gray-400">De {loan.totalInstallments} cuotas</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center relative z-10">
            <div>
              <p className="text-[12px] text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Próxima cuota</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">{money(loan.nextInstallment)}</span>
                <span className="text-sm text-rose-500 font-bold">Vence {loan.dueDate}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowPayModal(true)}
              className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
            >
              Pagar
            </button>
          </div>
        </div>

        {/* Oferta de Préstamo Pre-aprobado */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-6 shadow-lg text-white relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full mix-blend-overlay filter blur-[20px] group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <Icon name="star" size={20} />
            </div>
            <h3 className="text-xl font-bold mb-1">Préstamo Pre-aprobado</h3>
            <p className="text-blue-100 text-sm mb-4">Tienes un límite disponible de S/ 10,000. Desembólsalo al instante.</p>
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-sm font-bold shadow-sm w-max">
              Ver detalles
            </button>
          </div>
        </div>

      </div>

      {/* Modal Simulador de Pago */}
      {showPayModal && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPayModal(false)}></div>
          <div className="bg-white w-full rounded-t-[2rem] p-6 relative z-10 animate-slide-up">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 text-center">Confirmar Pago de Cuota</h3>
            
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 border-dashed">
                <span className="text-gray-500 font-medium">Monto a pagar</span>
                <span className="text-2xl font-extrabold text-gray-900">{money(loan.nextInstallment)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Cuenta origen</span>
                <span className="font-bold text-gray-900">Ahorros •••• 4582</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowPayModal(false);
                alert('Pago simulado con éxito');
              }}
              className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl text-[15px] shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
            >
              Confirmar y Pagar
            </button>
            <button 
              onClick={() => setShowPayModal(false)}
              className="w-full mt-3 text-gray-500 font-bold py-4 rounded-2xl text-[15px] active:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Estilos para animación del modal */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
