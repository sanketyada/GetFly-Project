# BuildTracker - Construction Field Management

This project is a responsive React.js web application built as part of the GetFly Technologies Frontend Web Developer Intern task.

## Features Implemented
- **Login Screen**: Mock authentication (`MSD@test.com` / `070707`) with validation and error handling.
- **Active Projects Dashboard**: List of hardcoded projects, filtering by status, search by name/location, and modern grid layout.
- **Daily Progress Report (DPR) Form**: A dynamic form to submit daily reports with fields for date, weather, work description, and worker count.
- **Photo Upload**: Allows uploading up to 3 site photos with live preview and removal.
- **Responsive UI**: Fully mobile-first design leveraging Tailwind CSS that adapts smoothly to tablets and desktops without horizontal scrolling.
- **Routing**: Protected routes using React Router v7, ensuring unauthenticated users are redirected to the Login page.
- **Animations**: Soft and performant UI transitions for a premium feel.

## Tech Stack
- **React.js 19**
- **Tailwind CSS v4** configured via Vite plugin
- **React Router v7** for declarative, nested client-side routing
- **React Hook Form** for performant and straightforward form validation
- **Lucide React** for modern, crisp SVG icons
- **Vite** as a lightning-fast build tool

## Setup and Running Instructions

1. **Clone the repository** (or navigate to the project directory).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**:
   Navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Known Issues / Limitations
- **Mock Authentication**: Real JWT authentication is not implemented. A mock authentication flow using React Context and `localStorage` simulates sessions.
- **Mock Data Persistence**: Submitted DPR Forms do not persist to a database. A success toast is displayed, followed by a redirect back to the projects list.
- **Image Upload Memory**: Images are previewed using `URL.createObjectURL()`. They are not transmitted to any cloud storage bucket.
