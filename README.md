# 🎧 WannaBeNonChalant

> **A sleek, client-side music discovery experience**

WannaBeNonChalant is a modern, high-performance music discovery web application powered by the iTunes Search API. Designed with a minimalist glassmorphic aesthetic, it enables users to seamlessly search, filter, sort, and preview 30-second audio snippets—delivering a premium, production-ready frontend experience.

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
| **iTunes API** | Music data |
| **CORS Proxy (corsproxy.io)** | API request handling |

---

## 🧱 Architecture Overview

```
.
├── index.html        # Semantic layout
├── styles.css        # Glassmorphic UI styling
└── js/
    ├── app.js             # Main controller & event handling
    ├── api.js             # API communication layer
    ├── uiRenderer.js      # Dynamic DOM rendering
    ├── audioController.js # Singleton audio engine
    └── storage.js         # Local storage management
```

---

## 🚀 Features

### 🔍 Smart Live Search (Debounce)
- Implements a custom debounce using closures and `setTimeout`
- Reduces unnecessary API calls
- Enhances performance and responsiveness

### 🧠 Advanced Data Manipulation
- Uses `.filter()` for real-time searching and explicit filtering
- Uses `.sort()` for dynamic ordering (duration, release date, alphabetical)
- Handles all data processing client-side for optimized performance

### 🔊 Singleton Audio Engine
- Ensures only one track plays at a time
- Prevents overlapping audio
- Provides centralized playback control (play/pause/reset)

### 🎨 Dynamic UI Rendering
- Uses `.map()` to generate UI components
- Formats raw data into user-friendly outputs (MM:SS)
- Keeps DOM updates efficient with minimal reflow

### ⭐ Favorites System
- Allows users to logically like and unlike tracks
- Saved tracks persist in local storage
- Dedicated favorites modal with playback controls

---

## 🌐 API Integration

- **Endpoint:** `https://itunes.apple.com/search?term=`
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