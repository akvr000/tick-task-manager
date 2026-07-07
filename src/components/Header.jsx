import React from 'react';
import { LogoIcon, BellIcon, SunMoonIcon } from '../assets/Icons';

export default function Header({ remainingCount, doneCount, isRinging, toggleTheme }) {
  return (
    <header className="w-full max-w-[650px] mx-auto my-8 px-3 sm:px-4 pb-5 border-b border-[#6b6b6b71] select-none">
      <nav className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <LogoIcon />
          <h2 className="text-xl font-bold text-[var(--primary-color)]">tick</h2>
        </div>
        <div className="flex items-center gap-4 text-[var(--muted)] text-sm sm:text-base">
          <div className="flex">
            <span>{remainingCount} remaining ·&nbsp;</span>
            <span>{doneCount} done</span>
          </div>
          <div className="flex gap-3">
            <button className="border-none bg-transparent cursor-pointer" title="bell">
              <BellIcon ringing={isRinging} />
            </button>
            <button onClick={toggleTheme} className="border-none bg-transparent cursor-pointer" title="theme-toggle">
              <SunMoonIcon />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}