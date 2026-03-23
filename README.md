# 🎧 WannaBeNonChalant

> **A sleek, client-side music discovery experience**

WannaBeNonChalant is a modern, high-performance music discovery web application powered by the Deezer Public API. Designed with a minimalist glassmorphic aesthetic, it enables users to seamlessly search, filter, sort, and preview 30-second audio snippets—delivering a premium, production-ready frontend experience.

---

## ✨ Overview

This project is a demonstration of advanced frontend engineering principles using **pure Vanilla JavaScript**. It focuses on performance optimization, clean architecture, and modern UI design without relying on heavy frameworks.

---

## 🎯 Core Objectives

- Demonstrate advanced proficiency in **Vanilla JavaScript (ES6+)**
- Implement **asynchronous programming** using `async/await` and Promises
- Utilize **Array Higher-Order Functions** for efficient data handling
- Build a **custom debounce function** using closures
- Manage audio playback using a **Singleton design pattern**

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure |
| **CSS3** | Flexbox, Grid, CSS Variables, Glassmorphism |
| **JavaScript (ES6+ Modules)** | Core logic & interactivity |
| **Deezer Public API** | Music data |
| **CORS Proxy (corsproxy.io)** | API request handling |

---

## 🧱 Architecture Overview

```
.
├── index.html        # Semantic layout
├── styles.css        # Glassmorphic UI styling
└── js/
    ├── app.js        # Main controller & event handling
    ├── api.js        # API communication layer
    ├── ui.js         # Dynamic DOM rendering
    └── audio.js      # Singleton audio engine
```

---

## 🚀 Planned Features

### 🔍 Smart Live Search (Debounce)
- Will implement a custom debounce using closures and `setTimeout`
- Will reduce unnecessary API calls
- Will enhance performance and responsiveness

### 🧠 Advanced Data Manipulation
- Will use `.filter()` for real-time searching
- Will use `.sort()` for dynamic ordering (duration, popularity)
- Will handle all data processing client-side for optimized performance

### 🔊 Singleton Audio Engine
- Will ensure only one track plays at a time
- Will prevent overlapping audio
- Will provide centralized playback control (play/pause/reset)

### 🎨 Dynamic UI Rendering
- Will use `.map()` to generate UI components
- Will format raw data into user-friendly outputs (MM:SS)
- Will keep DOM updates efficient with minimal reflow

---

## 🌐 API Integration

- **Endpoint:** `https://api.deezer.com/search?q=`
- **Proxy:** `https://corsproxy.io/?`
- Fetches:
  - Track metadata
  - Artist information
  - Album artwork
  - 30-second preview audio

---

## 🏆 Why This Project Stands Out

- Solves real-world frontend challenges (async flows, audio state management)
- Demonstrates strong **algorithmic thinking** via client-side processing
- Optimized API usage with **debouncing & smart filtering**
- Clean, scalable **modular architecture**
- Premium **glassmorphism UI** for a polished user experience

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/skullxcode/WannaBeNonChalant.git

# Navigate into the project
cd WannaBeNonChalant

# Open in browser
# Open index.html OR use Live Server
```

---

## 🔮 Future Improvements

- [ ] 🎵 Playlist creation functionality
- [ ] ⭐ Favorites / bookmark system
- [ ] 🔐 User authentication
- [ ] 🗄 Backend integration for persistence
- [ ] 🤖 Smarter recommendation engine

---

## 🙌 Credits

- Project name suggested by **Parineeta**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Final Note

WannaBeNonChalant is more than just a music app — it's a showcase of clean frontend engineering, performance-focused design, and modern UI craftsmanship built from the ground up without frameworks.