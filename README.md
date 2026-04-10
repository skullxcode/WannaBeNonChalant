# 🎧 WannaBeNonChalant: Music Discovery Web App

> **A sleek, client-side music discovery experience**
> 
> 🔗 ✨ **[Live Demo: Play with WannaBeNonChalant here!](https://skullxcode.github.io/WannaBeNonChalant/)** ✨

---

## ✨ Description

WannaBeNonChalant is a modern, high-performance music discovery web application powered by the iTunes Search API. Designed with a minimalist glassmorphic aesthetic, it enables users to seamlessly search, filter, sort, and preview 30-second audio snippets—delivering a premium, production-ready frontend experience explicitly built to showcase advanced vanilla web technologies.

---

## 🚀 Features

- **🔍 Smart Live Search (Debounce):** Implements custom debounce logic to reduce unnecessary API calls and enhance responsiveness.
- **🔊 Singleton Audio Engine:** Ensures only one track plays at a time and prevents overlapping 30-second audio previews.
- **⭐ Favorites System:** Allows users to logically like and unlike tracks, persistently saving them in local storage.
- **🧠 Advanced Data Manipulation:** Real-time search filtering and dynamic sorting (duration, release date, alphabetical) handled entirely on the client-side.
- **🎨 Dynamic UI Rendering:** Smoothly generates UI components from raw data to keep DOM updates visually cohesive and layout reflows minimal.

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **HTML** | Semantic structure & accessible DOM elements |
| **CSS** | Flexbox, Grid, CSS Variables, Glassmorphism |
| **JavaScript** | Core logic & interactivity (ES6+ Modules) |

---

## 🎯 Concepts Used

- **Higher Order Functions:** Utilized to abstract repetitive logic and enhance component reusability.
- **Callback Functions:** Implemented for DOM event handling, application state updates, and clean closures.
- **Array Methods:** Heavy utilization of `forEach`, `map`, `filter`, `find`, and `sort` for manipulating and displaying music data streams.
- **Asynchronous JavaScript:** Usage of `setTimeout` and `setInterval` for managing debounce timers and UI loading states.
- **Promises:** Utilizing `.then`, `.catch`, and `.finally` to cleanly handle asynchronous operations.
- **Fetch API and JSON:** Making outgoing requests to the iTunes Search API and parsing the returned JSON payloads.
- **Async/Await with try/catch:** Standardizing readable non-blocking code alongside fail-safe error boundaries.

---

## 🏁 How to Run the Project

Follow these steps to run the application locally:

```bash
# 1. Clone or download the repository
git clone https://github.com/skullxcode/WannaBeNonChalant.git

# 2. Navigate into the project directory
cd WannaBeNonChalant

# 3. Open in your browser
# Double-click index.html OR use an extension like Live Server
```

---

## 🧱 Project Structure

```text
.
├── index.html             # The semantic layout and HTML entry point
├── styles.css             # Glassmorphic UI styling and flexible layouts
└── js/
    ├── app.js             # Main controller that wires components and handles events
    ├── api.js             # Dedicated communication layer for fetching track data
    ├── uiRenderer.js      # Module responsible for dynamic DOM rendering
    ├── audioController.js # Singleton instance handling 30-second audio playback
    └── storage.js         # Utility module managing local storage persistence
```

---

## 🔮 Future Improvements

- [ ] 🎨 **UI/CSS Polish:** Enhancing the current aesthetic with improved micro-animations and a dark mode toggle.
- [ ] 🎵 **Playlist Creation:** Allow users to bundle and organize tracks into custom playlists alongside basic likes.
- [ ] 🔐 **User Authentication:** Enable an account system so users can back up their preferences.
- [ ] 🗄 **Backend Integration:** Implementing a dedicated backend database to sync data across devices.

---

## ✍️ Author

**Ujjwal Jain**

---

## 🙌 Credits

- Project name suggested by **Parineeta**