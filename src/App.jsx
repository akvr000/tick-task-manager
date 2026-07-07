import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import EditModal from './components/EditModal';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tick_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTab, setCurrentTab] = useState('all-tab');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  // Keep track of which tasks have already alerted so they don't ring constantly
  const alertedTasksRef = useRef(new Set());

  useEffect(() => {
    localStorage.setItem('tick_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  // Request notification permission when the application loads
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Web Audio Synthesizer (No external .mp3 file needed!)
  // Web Audio Synthesizer configured for maximum clarity and volume
const playAlertSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Create a 3-blast urgent buzzer sequence
    const notes = [
      { time: 0, freq: 950 },
      { time: 0.12, freq: 950 },
      { time: 0.24, freq: 1200 }
    ];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // 'square' creates a sharp harmonic profile that sounds much louder
      osc.type = 'square'; 
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
      
      // Set volume gain close to full headroom limit without digital clipping
      gain.gain.setValueAtTime(0.25, ctx.currentTime + note.time);
      // Quick cutoff envelope to make it punchy
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + 0.09);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + note.time);
      osc.stop(ctx.currentTime + note.time + 0.1);
    });
  } catch (e) {
    console.log("Audio play blocked by browser autoplay policy");
  }
};

  // Check for overdue tasks every minute
  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      let triggeredAlert = false;

      tasks.forEach(task => {
        if (task.date && !task.completed) {
          const taskDate = new Date(task.date);
          
          // If the task is past its due date and hasn't alerted yet
          if (taskDate < now && !alertedTasksRef.current.has(task.id)) {
            alertedTasksRef.current.add(task.id);
            triggeredAlert = true;

            // Trigger System Notification if permitted
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Tick App: Task Overdue!", {
                body: `"${task.text}" is past its due date!`,
                icon: "/favicon.svg"
              });
            }
          }
        }
      });

      if (triggeredAlert) {
        playAlertSound();
      }
    };

    checkOverdueTasks(); // Check instantly on mount/update
    const interval = setInterval(checkOverdueTasks, 60000); // Check every 60 seconds
    return () => clearInterval(interval);
  }, [tasks]);

  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);
  
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    // Remove from alert registry if completed or unchecked so it can trigger again if edited
    alertedTasksRef.current.delete(id);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    alertedTasksRef.current.delete(id);
  };
  
  const handleConfirmClearAll = () => {
    setTasks([]);
    alertedTasksRef.current.clear();
    setIsConfirmOpen(false);
  };

  const handleSaveEdit = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    alertedTasksRef.current.delete(updatedTask.id); // Reset alert rule so edited date can ring
    setEditingTask(null);
  };

  const handleReorderTasks = (draggedId, targetId) => {
    if (draggedId === targetId) return;
    const draggedIndex = tasks.findIndex(t => t.id === draggedId);
    const targetIndex = tasks.findIndex(t => t.id === targetId);
    
    const updatedTasks = [...tasks];
    const [removed] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, removed);
    setTasks(updatedTasks);
  };

  const remainingCount = tasks.filter(t => !t.completed).length;
  const doneCount = tasks.filter(t => t.completed).length;
  const hasOverdue = tasks.some(t => t.date && new Date(t.date) < new Date() && !t.completed);

  return (
    <div className="h-screen w-full flex flex-col bg-[var(--bg-primary)] overflow-hidden select-none">
      <Header 
        remainingCount={remainingCount} 
        doneCount={doneCount} 
        isRinging={hasOverdue} 
        toggleTheme={() => setIsDarkTheme(!isDarkTheme)} 
      />

      <main className="w-full max-w-[650px] mx-auto px-4 flex flex-col gap-5 flex-1 min-h-0">
        <TaskInput onAddTask={handleAddTask} />
        <TaskList 
          tasks={tasks} 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          onToggleComplete={handleToggleComplete}
          onEditClick={setEditingTask}
          onDeleteTask={handleDeleteTask}
          onReorderTasks={handleReorderTasks}
        />
      </main>

      <footer className="w-full max-w-[650px] mx-auto px-4 py-5 border-t border-[#6b6b6b71] bg-[var(--bg-primary)]">
        <div className="flex justify-between items-center w-full text-xs sm:text-sm text-[var(--muted)]">
          <p>drag tasks to reorder · click indicator to complete</p>
          <button 
            onClick={() => setIsConfirmOpen(true)} 
            className="bg-transparent border-none text-[var(--light-red)] font-mono cursor-pointer hover:opacity-80 transition-opacity"
          >
            clear all
          </button>
        </div>
      </footer>

      <EditModal isOpen={!!editingTask} task={editingTask} onClose={() => setEditingTask(null)} onSave={handleSaveEdit} />
      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmClearAll} />
    </div>
  );
}