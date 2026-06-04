# Task Manager

A modern task management application built with React and Vite. This project includes user authentication, task listing, search and filter controls, and clean responsive UI styling.

## Features

- Login page with form validation
- Task dashboard with searchable, paginated task lists
- Task details view and status management
- Responsive layout for mobile and desktop
- Clean design using shared CSS variables and component styles

## Tech stack

- React 19
- Vite 4
- React Router DOM 7
- ESLint 10
- Native CSS with shared component styling



### Install dependencies

```bash
cd task
npm install
```

### Start development server

```bash
npm run dev
```


## Project structure

- `src/`
  - `components/` — reusable UI pieces such as `AddTask`, `Navbar`, `TaskCard`, and `Pagination`
  - `context/` — global state management for tasks and theme settings
  - `hooks/` — shared utilities like pagination helpers
  - `pages/` — top-level routes including `Dashboard`, `Login`, and `TaskDetails`
  - `routes/` — app routing and protected route handling
  - `services/` — API stubs and validation logic
  - `styles/` — global styles and component-specific CSS

## Notes

- Authentication is handled locally for demonstration purposes using `localStorage`.
- The current design uses CSS variables and responsive media queries for consistent appearance.
- Update or extend the task data flow in `services/api.js` to integrate with a real backend.


