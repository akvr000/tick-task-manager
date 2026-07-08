import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, currentTab, setCurrentTab, onToggleComplete, onEditClick, onDeleteTask, onReorderTasks }) {
  const filteredTasks = tasks.filter(task => {
    if (currentTab === 'active-tab') return !task.completed;
    if (currentTab === 'done-tab') return task.completed;
    return true;
  });

  return (
    /* flex-1 min-h-0 flex flex-col lets the wrapper expand without breaking parents */
    <div className="flex-1 min-h-0 flex flex-col gap-4 w-full">

      {/* Tab Selectors - Fixed */}
      <div className="flex justify-between gap-2 flex-shrink-0">
        {['all-tab', 'active-tab', 'done-tab'].map((tab) => {
          const isActive = currentTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`flex-1 p-2.5 text-sm outline outline-1 outline-[#6b6b6b6d] cursor-pointer font-mono transition-colors ${isActive
                  ? 'bg-[var(--secondary-color)] text-[#0e0e0e] font-bold outline-[var(--secondary-color)] hover:bg-[var(--secondary-color)] opacity-95'
                  : 'bg-[var(--bg-secondary)] text-[var(--muted)] hover:bg-[#6b6b6b25]'
                }`}
            >
              {tab === 'all-tab' ? 'All' : tab === 'active-tab' ? 'Active' : 'Done'}
            </button>
          );
        })}
      </div>

      {/* Priority Indicator Row - Fixed */}
      <div className="flex items-center justify-start text-[var(--muted)] text-xs sm:text-sm pb-3 border-b border-[#6b6b6b71] flex-shrink-0">
        <p className="flex items-center flex-wrap">
          <span className="inline-block w-1.5 h-1.5 rounded-full mx-1.5 bg-[var(--light-red)]"></span>high
          <span className="inline-block w-1.5 h-1.5 rounded-full mx-1.5 bg-[var(--light-orange)]"></span>medium
          <span className="inline-block w-1.5 h-1.5 rounded-full mx-1.5 bg-[var(--light-blue)]"></span>low
        </p>
      </div>

      {/* The Scroll Container - This is the only part of the screen that will scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
        <ul className="flex flex-col gap-2 list-none pb-2">
          {filteredTasks.length === 0 ? (
            <span className="text-[var(--muted)] italic text-center block my-12">No tasks found here...</span>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEditClick={onEditClick}
                onDeleteTask={onDeleteTask}
                onReorderTasks={onReorderTasks}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}