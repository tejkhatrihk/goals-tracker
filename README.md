# Goals Tracker

A simple, responsive goals/to-do tracker built with React (Vite), Material UI, and Tailwind CSS. Goals are persisted to localStorage so they survive page reloads.

## Features

- Add new goals with validation (Enter key supported)
- Toggle completion state
- Delete goals
- Persistent storage via localStorage
- Material UI layout with AppBar and footer

## Tech Stack

- React 19 + Vite
- Material UI (MUI)
- Tailwind CSS v4 (zero-config)
- ESLint (React hooks + refresh rules)

## Project Structure

```
src/
	App.jsx            # Main app: state + handlers
	components/
		Layout.jsx       # AppBar, menu toggle, footer
		Menu.jsx         # Simple menu (placeholder)
		GoalInput.jsx    # Input and add button
		GoalList.jsx     # List with checkbox + delete
	hooks/
		useLocalStorage.js # Persist state to localStorage
	styles (index.css, App.css)
```

## Getting Started

Prereqs: Node 18+ recommended.

Development server:

```
npm install
npm run dev
```

Lint:

```
npm run lint
```

Build:

```
npm run build
npm run preview
```

## Roadmap / Ideas

- Unique IDs for goals and better keys
- Edit goal text inline
- Filters: All / Active / Completed
- Clear completed
- Progress summary (x of y completed)
- Undo/confirm on delete (MUI Snackbar)
- Move menu into a left Drawer
- Add tests with Vitest + React Testing Library
- Consider TypeScript or PropTypes

## License

MIT
