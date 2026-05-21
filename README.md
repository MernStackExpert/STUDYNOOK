# StudyNook — Next-Gen Academic Infrastructure & Workspace Reservation System

StudyNook is a highly polished, premium, and fully responsive Single Page Application (SPA) designed to optimize study room allocations, eliminate resource scheduling friction, and maximize academic productivity. Built with React, Tailwind CSS, Framer Motion, and Node.js/Express, the platform features an intuitive interface with full dark/light mode compatibility, live synchronization, and robust time-conflict protection.

**Live Frontend Dashboard:** [https://study-nooks.vercel.app/](https://study-nooks.vercel.app/)

---

## ✨ Architectural Features & Core Capabilities

- **💎 Premium & Ultra-Modern UI/UX:** Styled using custom desaturated color spaces, high-fidelity glassmorphism, responsive data grids, and state-driven interactive states using `Framer Motion`.
- **🌗 Native Adaptive Theme Engine:** Seamless synchronization between complete system-wide Light and Dark mode UI components.
- **🛡️ Conflict-Protected Scheduling Matrix:** Real-time interactive slot configuration panel that automatically calculates hourly subtotals and prevents temporal resource overlapping.
- **🔒 Secure JWT & Cookie Ecosystem:** Router access structures are strictly managed through state-driven `PrivateRoute` wraps coupled with authorized Axios handshake instances (`withCredentials`).
- **Telemetry & Validation Hubs:** Interactive user review matrices, detailed space specifications (amenity lists, capacity, floor layouts), and a modular cancellation flow with state preservation.

---

## 🛠️ Technological Stack Matrix

### Frontend Ecosystem
- **Core Library:** React (Vite-powered environment)
- **Routing Engine:** React Router DOM (v6 with relative path mappings)
- **State & Context:** React Context API (Unified `AuthContext` management)
- **Styling Architecture:** Tailwind CSS (PostCSS processor engine)
- **Animation Layer:** Framer Motion (State-driven transitions & `AnimatePresence` orchestration)
- **Data Querying / Handshakes:** Axios (Configured client with instance telemetry)
- **Toasts & Feedback:** React Hot Toast

### Backend Infrastructure (Reference)
- **Runtime:** Node.js
- **Server Framework:** Express.js
- **Database Indexing:** MongoDB (Aggregations and document tracking)
- **Security:** JSON Web Tokens (JWT via secure HTTP-Only cookies)

---

## 📂 Structural Tree Layout

```text
src/
├── components/       # Atomic UI elements (RoomCard, ThemeToggle, Navbar, Footer)
├── layouts/          # MainLayout structure with dynamic context outlet wrappers
├── providers/        # Unified AuthProvider orchestrating state handshakes
├── routes/           # Router configuration arrays containing custom PrivateRoute wraps
├── pages/            # View Modules
│   ├── Home.jsx          # Next-Gen Academic Landing Dashboard & Telemetry
│   ├── AllRooms.jsx      # Multi-facet interactive workspace layout explorer
│   ├── RoomDetails.jsx   # Premium slot-configurator panel & detailed specs
│   ├── MyBookings.jsx    # User schedule matrix with localized action handlers
│   ├── AddRoom.jsx       # Workspace specification compiler form
│   ├── MyListings.jsx    # Real-time asset management control panel
│   └── NotFound.jsx      # Animated 404 routing state page
└── assets/           # High-fidelity vectors and static design materials