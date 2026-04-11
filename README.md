🏠 Household Billing Tracker

A frontend-first web application designed to help households track shared bills, upcoming payments, and individual contributions — built with scalability toward a future backend.

This project is currently focused on UI, UX, and frontend architecture, with backend integration planned for later phases.

-----------------------------------------------
🚀 Project Status

Current Phase: Phase A — Frontend Foundations
Approach: Frontend-first, backend later
Auth: Frontend-only (mocked with localStorage)

-----------------------------------------------
✨ Features (So Far)

🔐 Authentication (Frontend-only)
- Login page UI
- Persistent login using localStorage
- Protected routes
- Logout functionality
- Session survives page refresh

🧭 Navigation & Layout
- Shared navbar layout for authenticated pages
- Navigation between:
    - Dashboard
    - Bills
- Navbar hidden on login page
- Route protection handled cleanly

📊 Dashboard
- Dashboard page scaffold
- Recharts integration (data visualization)
- Ready for spending / billing summaries

🎨 UI & Styling
- Tailwind CSS
- Mobile-friendly layout (responsive by default)
- Clean, modern UI components

-----------------------------------------------
🛠 Tech Stack
Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Recharts

Tooling

- ESLint
- Prettier
- Git + GitHub
- GitHub Codespaces

Backend (Planned)

- Node.js
- Express
- MongoDB
- JWT Authentication

-----------------------------------------------
📁 Project Structure (Simplified)
client/
  src/
    components/
      ConfirmModal.tsx
      Layout.tsx
      ProtectedRoute.tsx
    pages/
      AddBill.tsx
      Bills.tsx
      Dashboard.tsx
      EditBills.tsx
      Login.tsx
    App.tsx
    main.tsx

-----------------------------------------------
🔒 Authentication Notes

Authentication is currently frontend-only:

- Login state stored in localStorage
- Used to simulate real auth behavior
- Backend auth planned for later

-----------------------------------------------
🧭 Roadmap
Phase A — Frontend (Current)

- ✅ Login page
- ✅ Persistent auth
- ✅ Protected routes
- ✅ Navbar layout
- ✅ Dashboard UI
- ✅Bills list UI
- ✅Add/Edit bill forms
- Contribution breakdown UI

Phase B — Frontend Data Simulation

- Mock API data
- State management
- Loading & error states

Phase C — Backend Integration

- Express API
- MongoDB
- Real authentication
- Household sharing logic

------------------------------------------------
🎯 Learning Goals

This project is intentionally being built to:

- Strengthen frontend fundamentals
- Practice real-world React architecture
- Build a portfolio-ready application
- Gradually introduce backend concepts without overwhelm

-----------------------------------------------
🧑‍💻 Author
Kevin Trinidad
Aspiring Frontend Developer
Learning React, UI architecture, and scalable app design

-----------------------------------------------
📌 Notes
This project is a work in progress and is evolving as new features are added and skills improve.