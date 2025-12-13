import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative admin-card rounded-3xl p-6 w-full max-w-md animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-lg">
            <AlertTriangle size={32} />
          </div>
          
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-slate-300 leading-relaxed">{message}</p>

          <div className="flex gap-3 w-full pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 transition"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 shadow-lg hover:-translate-y-0.5 transition"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
