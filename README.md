# Media Search App

A modern media search application built with React, Redux Toolkit, and Tailwind CSS that allows users to search and explore photos, videos, and GIFs from multiple APIs.

---

## Features

* Search Photos using Unsplash API
* Search Videos using Pexels API
* Search GIFs using GIPHY API
* Responsive media grid layout
* Dynamic tab-based filtering
* Pagination support
* Video hover autoplay
* Download photos/videos directly from cards
* Loading and error state handling
* Global state management with Redux Toolkit
* Reusable UI components

---

## Tech Stack

* React.js
* Redux Toolkit
* JavaScript (ES6+)
* Tailwind CSS
* Vite
* Fetch API
* REST APIs

---

## APIs Used

* Unsplash API
* Pexels API
* GIPHY API

---

## Folder Structure

src/
├── api/
│   ├── mediaApi.js
│
├── components/
│   ├── SearchBar.jsx
│   ├── Tabs.jsx
│   ├── ResultGrid.jsx
│   ├── ResultCard.jsx
│   ├── Pagination.jsx
│
├── redux/
│   ├── store.js
│   └── features/
│       └── searchSlice.js

---

## Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_UNSPLASH_KEY=your_unsplash_api_key
VITE_PEXELS_KEY=your_pexels_api_key
VITE_GIPHY_KEY=your_giphy_api_key
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project folder:

```bash
cd media-search-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---

## Concepts Implemented

* Async API fetching with Fetch API
* Redux Toolkit global state management
* React Hooks (`useEffect`, `useSelector`, `useDispatch`, `useRef`)
* Conditional rendering
* Data normalization across APIs
* Pagination handling
* Responsive UI design
* Media handling and downloads
* Error and loading state management

---

## Future Improvements

* Infinite scrolling
* Masonry layout
* Debounced search
* Favorites / bookmarks
* Authentication
* Dark / light theme toggle
* Media preview modal

---

## Author

Built by Dipur Movies
