<div align="center">

<svg width="90" height="90" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
  <rect width="28" height="28" fill="#e8ff47"/>
  <polyline points="7,14 12,20 21,9"
    stroke="#0e0e0e"
    stroke-width="2.8"
    stroke-linecap="square"
    stroke-linejoin="miter"
    fill="none"/>
</svg>

# tick

### A minimal matrix task manager built for speed, focus, and clarity.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 📖 Overview

**tick** is an ultra-minimal, high-performance task management application designed for speed and clarity.

Instead of multiple pages and unnecessary complexity, **tick** keeps everything inside one focused workspace. Your headers, inputs, counters, and footer remain fixed while only your task matrix scrolls independently, allowing you to stay focused without losing context.

The application is lightweight, responsive, and stores everything locally—no backend required.

---

## ✨ Features

- ⚡ Persistent synchronization using **localStorage**
- 📌 Native HTML5 drag-and-drop task reordering
- 🔊 Built-in square-wave deadline audio alerts (Web Audio API)
- 🔔 Native browser desktop notifications
- 📱 Responsive layout for desktop, tablet, and mobile
- 📋 Matrix-style scrolling task container
- 🎯 Fixed workspace layout for distraction-free productivity
- 💾 Automatic data persistence
- ✏️ Edit existing tasks
- 🗑️ Delete confirmation modal
- ⏰ Deadline tracking
- 🎨 Clean minimal UI

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| React 18+ | UI |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Hooks | State Management |
| localStorage API | Data Persistence |
| Notification API | Desktop Notifications |
| Web Audio API | Deadline Alerts |
| HTML5 Drag & Drop API | Task Reordering |

---

## 📁 Project Structure

```text
tick
│
├── public
│   ├── favicon.svg
│   └── tick_preview.webp.png
│
├── src
│   ├── assets
│   │   └── Icons.jsx
│   │
│   ├── components
│   │   ├── ConfirmModal.jsx
│   │   ├── EditModal.jsx
│   │   ├── Header.jsx
│   │   ├── TaskInput.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/akvr000/tick.git
```

### Enter the project directory

```bash
cd tick
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Visit

```
http://localhost:5173
```

---

## 📦 Production Build

Create a production build.

```bash
npm run build
```

Preview the production build.

```bash
npm run preview
```

---

## 💾 Data Storage

All tasks are stored inside your browser using the **localStorage API**.

No login.
No backend.
No database.
No internet connection required after loading.

---

## 🔔 Notifications

When permission is granted, **tick** sends native browser notifications whenever a task reaches or passes its deadline.

---

## 🔊 Audio Alerts

Instead of relying on external sound files, **tick** generates a loud square-wave beep using the **Web Audio API**, ensuring lightweight performance and instant playback.

---

## 📱 Responsive Design

The interface is optimized for:

- 💻 Desktop
- 🖥 Laptop
- 📱 Mobile
- 📟 Tablet

The layout remains fixed while only the task matrix scrolls, creating a distraction-free experience across all screen sizes.

---

## 🎯 Design Philosophy

> Keep it simple.
>
> Keep it fast.
>
> Keep your priorities visible.

Every design decision in **tick** focuses on reducing distractions while making task management feel immediate and effortless.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 📄 License

Licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ using React, Tailwind CSS & Vite

⭐ Star this repository if you found it useful!

</div>