import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-[4px] flex justify-center items-center z-[1001]">
      <div className="bg-[var(--bg-secondary)] border border-[#6b6b6b6d] p-6 w-[92%] sm:w-full sm:max-w-[400px] flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--light-red)] border-b border-[#6b6b6b33] pb-2">
          Delete All Tasks?
        </h3>
        
        <p className="text-sm text-[var(--primary-color)] font-mono opacity-80">
          This actions will wipe out every single task permanently. Are you absolutely sure?
        </p>

        <div className="flex justify-end gap-3 mt-2">
          <button 
            onClick={onClose} 
            className="bg-transparent border border-[var(--muted)] text-[var(--primary-color)] px-4 py-2 cursor-pointer font-mono text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-[var(--light-red)] text-[#0e0e0e] font-bold border-none px-4 py-2 cursor-pointer font-mono text-sm hover:opacity-90"
          >
            Yes, Delete All
          </button>
        </div>
      </div>
    </div>
  );
}