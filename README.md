# Task Management Application

This is a simple task management application built with a modern frontend stack, including React, TypeScript, Vite, MUI and AG Grid library.

## Features

- **Modern Tech Stack**: React 19, Vite, and TypeScript for a fast, type-safe, and efficient development experience.
- **Component Library**: [Material-UI (MUI)](https://mui.com/) for a rich set of beautiful and accessible UI components.
- **Client-Side Routing**: Handled by [React Router](https://reactrouter.com/) for a seamless single-page application (SPA) experience.
- **Powerful Data Grid**: [AG Grid](https://www.ag-grid.com/) for displaying and managing complex data with ease.
- **User Notifications**: [Notistack](https://notistack.com/) for providing user feedback through snackbars.
- **Robust Tooling**: ESLint for code quality and Vitest for fast unit testing.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v20.x or later recommended)
- npm (v9.x or later) or another package manager like pnpm or yarn.

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    cd Task-Management
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Available Scripts

-   **Run the development server:**
    Starts the application in development mode with hot-reloading.
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

-   **Build for production:**
    Bundles the app for production to the `dist` folder.
    ```bash
    npm run build
    ```

-   **Lint your code:**
    Runs ESLint to check for code quality and style issues.
    ```bash
    npm run lint
    ```

-   **Run tests:**
    Launches the test runner in interactive watch mode.
    ```bash
    npm run test
    ```

## Architectural Decisions

### Core Technology

-   **React & Vite**: The project uses **React 19** for building the user interface, taking advantage of its latest features. **Vite** was chosen as the build tool for its incredibly fast development server and optimized build process.
-   **TypeScript**: TypeScript is used throughout the project to provide static typing, which helps catch errors early, improves code readability, and enhances the developer experience with better autocompletion.

### UI & Styling

-   **Material-UI (MUI)**: I chose MUI as the primary component library to accelerate UI development. It provides a comprehensive suite of well-tested, accessible, and customizable components that follow Material Design principles, ensuring a consistent and professional look and feel out of the box.

### Application Structure

-   **Component-Based Architecture**: The application is structured into logical components. A primary `Layout` component wraps the application's routes, providing a consistent structure (e.g., for a header or sidebar) across different views.
-   **Routing**: **React Router** manages client-side routing, enabling navigation between different sections of the application without full page reloads, which is standard for a modern SPA.
-   **Error Handling**: A top-level `ErrorBoundary` component is implemented to catch and handle JavaScript errors in its child component tree, preventing the entire application from crashing and allowing for a graceful fallback UI.

### State Management

-   TODO

### Additional Libraries

-   **AG Grid**: For displaying tabular data, AG Grid was chosen for its high performance and extensive feature set, including sorting, filtering, and custom cell rendering. It's a powerful tool for any data-intensive part of the application.
-   **Notistack**: To provide non-intrusive feedback to the user, Notistack is used for displaying snackbar notifications. It's easy to use and highly configurable.

## Trade-offs

-   **MUI vs. Custom Styling**: Using a large component library like MUI significantly speeds up development but can add to the final bundle size. The trade-off was made in favor of development velocity and a consistent, professional UI. A more bespoke application might opt for a utility-first CSS framework like Tailwind CSS or custom-styled components for more design control and a smaller footprint.
-   **Loose ESLint Rules**: Certain strict ESLint rules, such as `@typescript-eslint/no-explicit-any`, have been temporarily disabled. This was a pragmatic choice to speed up initial development and prototyping. The intention is to enable and enforce stricter rules as the codebase matures to improve long-term maintainability.
-   **No Global State Manager**: By not including a global state management library from the start, the initial setup is simpler and has less boilerplate. The trade-off is that if the application scales and state needs to be shared across many disconnected components, there will be a need to refactor and introduce a library like Redux or Zustand later on.

## AI Tools Used

-   **Gemini Code Assist** was used for:
    -   Code review and analysis.
    -   Identifying areas for improvement in code quality and architecture.
    -   Generating and structuring this README file.
