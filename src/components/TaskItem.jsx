import { EditIcon, DeleteIcon } from '../assets/Icons';

export default function TaskItem({ task, onToggleComplete, onEditClick, onDeleteTask, onReorderTasks }) {
  const isOverdue = task.date && new Date(task.date) < new Date() && !task.completed;

  const borderColors = {
    low: 'border-l-[var(--light-blue)]',
    medium: 'border-l-[var(--light-orange)]',
    high: 'border-l-[var(--light-red)]'
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id.toString());
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    onReorderTasks(draggedId, task.id);
  };

  return (
    <li 
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex justify-between items-center p-4 bg-[var(--bg-secondary)] border-l-4 cursor-grab active:cursor-grabbing select-none transition-all ${borderColors[task.priority] || 'border-l-transparent'}`}
    >
      {/* Left side: dot selector and text label */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span 
          onClick={() => onToggleComplete(task.id)} 
          className="w-3 h-3 rounded-full border border-[var(--muted)] cursor-pointer flex-shrink-0 hover:scale-110 transition-transform"
          style={{ backgroundColor: task.completed ? 'var(--muted)' : 'transparent' }}
        />
        <span className={`text-[var(--primary-color)] font-mono truncate transition-opacity ${task.completed ? 'line-through text-[var(--muted)] opacity-50' : ''}`}>
          {task.text}
        </span>
      </div>

      {/* Right side: date/time indicator, edit button, and delete button */}
      <div className="flex items-center gap-4 flex-shrink-0 ml-3">
        {task.date && (
          <span className={`text-xs font-mono ${isOverdue ? 'text-[var(--light-red)] font-bold' : 'text-[var(--muted)]'}`}>
            {(() => {
              const d = new Date(task.date);
              return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
            })()}
          </span>
        )}
        <button onClick={() => onEditClick(task)} className="bg-none border-none p-1 cursor-pointer flex items-center justify-center text-[var(--primary-color)] hover:scale-110 transition-transform" title="Edit">
          <EditIcon />
        </button>
        <button onClick={() => onDeleteTask(task.id)} className="bg-none border-none p-1 cursor-pointer flex items-center justify-center text-[var(--muted)] hover:scale-110 transition-transform" title="Delete">
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}