import React, { useState, useEffect } from 'react';

export default function EditModal({ isOpen, task, onClose, onSave }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (task) {
      setText(task.text);
      setPriority(task.priority);
      setDate(task.date || '');
    }
  }, [task]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-[4px] flex justify-center items-center z-[1000]">
      <div className="bg-[var(--bg-secondary)] border border-[#6b6b6b6d] p-6 sm:p-8 w-[92%] sm:w-full sm:max-w-[450px] flex flex-col gap-4">
        <h3 className="text-xl font-bold text-[var(--primary-color)] border-b border-[#6b6b6b33] pb-2">Edit Task</h3>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)] uppercase tracking-wider" htmlFor="modal-desc">Task Description</label>
          <input 
            id="modal-desc"
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="p-2.5 bg-[var(--bg-primary)] border border-[#6b6b6b6d] text-[var(--primary-color)] font-mono text-base outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)] uppercase tracking-wider">Priority</label>
          <div className="flex gap-2 flex-wrap">
            {['low', 'medium', 'high'].map((p) => {
              const activeStyles = {
                low: 'active:bg-[var(--light-blue)] bg-[var(--light-blue)] text-[#0e0e0e]',
                medium: 'active:bg-[var(--light-orange)] bg-[var(--light-orange)] text-[#0e0e0e]',
                high: 'active:bg-[var(--light-red)] bg-[var(--light-red)] text-[#0e0e0e]',
              };
              const outlineStyles = {
                low: 'text-[var(--light-blue)] outline-[1px] outline-[#4a9effb1]',
                medium: 'text-[var(--light-orange)] outline-[1px] outline-[#e8a8479c]',
                high: 'text-[var(--light-red)] outline-[1px] outline-[#ff4545a1]',
              };
              return (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 p-2 border-none bg-[var(--bg-primary)] font-mono cursor-pointer font-bold ${
                    priority === p ? activeStyles[p] : outlineStyles[p]
                  }`}
                >
                  {p === 'medium' ? 'med' : p}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)] uppercase tracking-wider" htmlFor="modal-date">Due Date</label>
          <input 
            id="modal-date"
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="p-2.5 bg-[var(--bg-primary)] border border-[#6b6b6b6d] text-[var(--primary-color)] font-mono text-base outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button onClick={onClose} className="bg-transparent border border-[var(--muted)] text-[var(--primary-color)] px-4 py-2.5 cursor-pointer font-mono">
            Cancel
          </button>
          <button onClick={() => onSave({ ...task, text, priority, date })} className="bg-[var(--secondary-color)] text-[#0e0e0e] font-bold border-none px-4 py-2.5 cursor-pointer font-mono">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}