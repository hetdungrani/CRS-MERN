import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: <CheckCircle size={20} />,
      bgColor: 'bg-emerald-500/90',
      borderColor: 'border-emerald-400',
      iconColor: 'text-emerald-100'
    },
    error: {
      icon: <XCircle size={20} />,
      bgColor: 'bg-red-500/90',
      borderColor: 'border-red-400',
      iconColor: 'text-red-100'
    },
    warning: {
      icon: <AlertCircle size={20} />,
      bgColor: 'bg-amber-500/90',
      borderColor: 'border-amber-400',
      iconColor: 'text-amber-100'
    },
    info: {
      icon: <Info size={20} />,
      bgColor: 'bg-blue-500/90',
      borderColor: 'border-blue-400',
      iconColor: 'text-blue-100'
    }
  };

  const { icon, bgColor, borderColor, iconColor } = config[type] || config.info;

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slideIn">
      <div className={`${bgColor} backdrop-blur-xl border ${borderColor} rounded-2xl shadow-2xl p-4 pr-12 min-w-[320px] max-w-md`}>
        <div className="flex items-start gap-3">
          <div className={iconColor}>
            {icon}
          </div>
          <p className="text-white text-sm font-medium leading-relaxed flex-1">
            {message}
          </p>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
