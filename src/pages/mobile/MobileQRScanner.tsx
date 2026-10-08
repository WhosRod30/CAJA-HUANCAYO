import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useBanking } from '../../app/bankingContext';
import { demoRecipients } from '../../mocks/recipients';

export function MobileQRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { beginTransfer, selectRecipient } = useBanking();

  // Activar la cámara web
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    }

    startCamera();

    return () => {
      // Apagar la cámara al desmontar el componente
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const simulateQRRead = async () => {
    setIsProcessing(true);
    // Simular el tiempo de leer el QR y encontrar al contacto
    await new Promise(r => setTimeout(r, 1500));
    
    // Seleccionar a un contacto por defecto ("Carlos Mendoza")
    beginTransfer();
    const carlos = demoRecipients.find(r => r.id === 'carlos') || demoRecipients[0];
    selectRecipient(carlos);
    
    // Redirigir a la pantalla de monto
    navigate('/mobile/transferencias/monto', { replace: true });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateQRRead();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header flotante */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md"
        >
          <Icon name="close" size={24} />
        </button>
        <h1 className="text-white font-bold text-lg">Escanear QR</h1>
        <div className="w-10 h-10 flex items-center justify-center text-white">
          <Icon name="help" size={24} />
        </div>
      </div>

      {/* Visor de la cámara */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {hasPermission === false ? (
          <div className="text-center px-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Icon name="warning" size={32} />
            </div>
            <p className="text-white font-medium">No se pudo acceder a la cámara. Revisa los permisos de tu navegador.</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay del Escáner (Cuadro delimitador) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white/50 rounded-[2rem] relative">
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-rose-500 rounded-tl-[2rem]"></div>
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-rose-500 rounded-tr-[2rem]"></div>
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-rose-500 rounded-bl-[2rem]"></div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-rose-500 rounded-br-[2rem]"></div>
            
            {/* Animación de escaneo simulada */}
            <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)] animate-scan"></div>
          </div>
        </div>

        {/* Capa de procesamiento (Cargando) */}
        {isProcessing && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="w-16 h-16 border-4 border-white/20 border-t-rose-500 rounded-full animate-spin mb-4"></div>
            <p className="text-white font-bold text-lg">Procesando código QR...</p>
          </div>
        )}
      </div>

      {/* Panel Inferior */}
      <div className="bg-black p-8 rounded-t-[2rem] z-10">
        <p className="text-white/80 text-center text-sm mb-6">
          Apunta la cámara al código QR para escanearlo automáticamente o elige una imagen.
        </p>
        
        {/* Input invisible para abrir galería */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex gap-4">
          <button 
            className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="image" size={20} />
            Cargar desde foto
          </button>
          
          {/* Botón oculto para simular escaneo sin imagen para el prototipo */}
          <button 
            className="flex-1 bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white font-bold py-4 rounded-2xl"
            onClick={simulateQRRead}
          >
            Simular Escaneo
          </button>
        </div>
      </div>
      
      {/* Añadimos keyframes en una etiqueta style local para la animación del láser */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
