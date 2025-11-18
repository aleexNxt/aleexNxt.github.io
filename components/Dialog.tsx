'use client';

import { useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={dialogRef}
        className="bg-white dark:bg-gray-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border dark:border-gray-800 shadow-lg"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-border dark:border-gray-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-primary dark:hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
