import React, { useState } from 'react';
import { FlagIcon, CalendarIcon } from '../assets/Icons';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddTask({ text, priority, date, completed: false, id: Date.now() });
    setText('');
    setDate('');
    setPriority('medium');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between gap-3">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Add a new task..." 
          className="flex-1 p-3 border-none outline outline-1 outline-[#6b6b6b6d] bg-[var(--bg-secondary)] text-[var(--primary-color)] text-base placeholder-[var(--muted)] min-w-0"
        />
        <button onClick={handleSubmit} className="w-[100px] bg-[var(--secondary-color)] text-[#0e0e0e] text-base font-bold border-none cursor-pointer">
          + add
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[var(--muted)] text-xs sm:text-sm">
        <FlagIcon />
        <button 
          onClick={() => setPriority('low')}
          className={`px-2 py-1 border-none transition-all ${priority === 'low' ? 'bg-[var(--light-blue)] text-[var(--bg-primary)]' : 'text-[var(--light-blue)] outline outline-1 outline-[var(--light-blue)]'}`}
        >low</button>
        <button 
          onClick={() => setPriority('medium')}
          className={`px-2 py-1 border-none transition-all ${priority === 'medium' ? 'bg-[var(--light-orange)] text-[var(--bg-primary)]' : 'text-[var(--light-orange)] outline outline-1 outline-[var(--light-orange)]'}`}
        >med</button>
        <button 
          onClick={() => setPriority('high')}
          className={`px-2 py-1 border-none transition-all ${priority === 'high' ? 'bg-[var(--light-red)] text-[var(--bg-primary)]' : 'text-[var(--light-red)] outline outline-1 outline-[var(--light-red)]'}`}
        >high</button>

        <label htmlFor="task-date" className="flex items-center gap-1 ml-1 cursor-pointer">
          <CalendarIcon />
          <span className="sr-only">Due date</span>
        </label>
        <input 
          type="date" 
          id="task-date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="bg-[var(--bg-primary)] border-none text-[var(--muted)] font-mono text-sm"
        />
      </div>
    </div>
  );
}