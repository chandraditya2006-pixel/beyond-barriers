// src/components/ToastContainer.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let bgColor = "bg-white border-slate-200 text-slate-800";
        let icon = <Info className="w-5 h-5 text-sky-500 shrink-0" />;

        if (toast.type === 'success') {
          bgColor = "bg-emerald-50/95 border-emerald-300 text-emerald-950";
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          bgColor = "bg-amber-50/95 border-amber-300 text-amber-950";
          icon = <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />;
        } else if (toast.type === 'info') {
          bgColor = "bg-sky-50/95 border-sky-300 text-sky-950";
          icon = <Info className="w-5 h-5 text-sky-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bgColor}`}
          >
            {icon}
            <div className="text-sm font-medium leading-snug flex-1">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
