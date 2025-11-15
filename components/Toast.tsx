import React from 'react';
import type { ToastMessage } from '../types';
import { CheckCircleIcon, XIcon } from './Icons';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const { message, type } = toast;

  const bgColor = {
    success: 'bg-earth-green',
    info: 'bg-blue-500',
    error: 'bg-red-600',
  }[type];

  const icon = {
    success: <CheckCircleIcon className="w-6 h-6 text-white" />,
    info: null, // No icon for info for a cleaner look, can be changed
    error: null,
  }[type];

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-4 p-4 rounded-lg shadow-2xl text-white ${bgColor} animate-fade-in-up`}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <p className="font-semibold">{message}</p>
      <button onClick={onClose} className="p-1 -mr-2 rounded-full hover:bg-black/20 transition-colors">
        <XIcon className="w-5 h-5" />
      </button>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;