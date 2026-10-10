import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

export function MobileLogin() {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();



  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password) return;

    setIsLoggingIn(true);
    // Simular el tiempo de respuesta del servidor bancario
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate('/mobile/inicio', { replace: true });
  };

  const handleBiometricLogin = async () => {
    setIsLoggingIn(true);
    // Simular escaneo biométrico
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate('/mobile/inicio', { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Fondo Premium Rediseñado (Reemplaza a la alpaca antigua) */}
      <div className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-br from-rose-600 via-red-500 to-rose-700 rounded-b-[3rem] shadow-lg overflow-hidden">
        {/* Efectos de luces y profundidad */}
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full mix-blend-overlay filter blur-[40px]"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-[300px] h-[300px] bg-orange-400/20 rounded-full mix-blend-overlay filter blur-[40px]"></div>

        {/* Silueta decorativa de montañas (Estilo sutil andino en vez de clipart) */}
        <svg className="absolute bottom-0 w-full h-32 opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col flex-1 px-6 pt-12 pb-8">
        {/* Header Logo */}
        <div className="flex justify-between items-center mb-8">
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md">
            <Icon name="menu" size={20} />
          </button>
          <div className="flex items-center gap-2 text-white">
            <Icon name="shield" size={24} />
            <span className="font-bold text-lg tracking-tight">Caja Huancayo</span>
          </div>
          <div className="w-10 h-10"></div> {/* Spacer */}
        </div>

        {/* Saludo */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">Hola, Milagros.</h1>
          <p className="text-rose-100 text-[15px]">Qué bueno verte por aquí</p>
        </div>

        {/* Tarjeta de Login */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white mb-8 relative">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Accede a tu banca digital</h2>
            <p className="text-gray-400 text-[13px] mt-1">De forma rápida y segura</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[15px] text-gray-900 outline-none focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10 transition-all placeholder-gray-400"
                placeholder="Clave web (6 dígitos)"
                maxLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoggingIn}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoggingIn}
              >
                <Icon name={showPassword ? "eyeOff" : "eye"} size={20} />
              </button>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 flex justify-center items-center h-[56px] ${password.length >= 4 && !isLoggingIn
                ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_8px_20px_rgba(225,29,72,0.3)] active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              disabled={password.length < 4 || isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          {/* Solución Biometría (La mejora recomendada) */}
          <div className="mt-6 flex flex-col items-center border-t border-gray-100 pt-5">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">O ingresa rápidamente con</p>
            <button
              onClick={handleBiometricLogin}
              disabled={isLoggingIn}
              className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-100 transition-colors shadow-sm active:scale-95 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-fingerprint-pattern preview-icon"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M2 12a10 10 0 0 1 18-6" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M9 6.8a6 6 0 0 1 9 5.2v2" /></svg>
            </button>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex justify-center gap-6 mb-8 px-2">
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-center text-gray-600 group-hover:text-rose-600 transition-colors">
              <Icon name="history" size={24} /> {/* Card icon alternative */}
            </div>
            <span className="text-[10px] text-gray-500 text-center leading-tight font-medium">Bloquear<br />tarjeta</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-center text-gray-600 group-hover:text-rose-600 transition-colors">
              <Icon name="shield" size={24} />
            </div>
            <span className="text-[10px] text-gray-500 text-center leading-tight font-medium">Token<br />digital</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-center text-gray-600 group-hover:text-rose-600 transition-colors">
              <Icon name="info" size={24} /> {/* Location icon alternative */}
            </div>
            <span className="text-[10px] text-gray-500 text-center leading-tight font-medium">Ubícanos<br />rápido</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto text-center pb-4">
          <button className="text-rose-600 font-bold text-[13px] hover:underline mb-6">
            ¿Problemas para ingresar?
          </button>
          <p className="text-gray-400 text-[10px]">v2.0.5</p>
        </div>
      </div>
    </div>
  );
}
