# TaskFlow: A To-Do List Management Application

TaskFlow is a full-stack application built with Next.js that helps teams manage their tasks efficiently. It provides separate dashboards for admins and employees, with features like task creation, assignment, status tracking, and AI-powered notifications.

## Features

-   **Dual Dashboards:** Separate, feature-rich dashboards for administrators and employees.
-   **Task Management:** Create, assign, and track tasks with statuses like 'To Do', 'Doing', 'Holding', and 'Completed'.
-   **Department & Employee Management:** Admins can easily add and manage departments and employees.
-   **AI-Powered Notifications:** Utilizes Genkit to automatically generate and send email notifications when new tasks are assigned.
-   **Interactive UI:** Built with shadcn/ui and Tailwind CSS for a modern, responsive, and accessible user experience.
-   **Profile Management:** Users can update their profile information and change their avatar.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

To get the application running locally, follow these steps:

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Firebase configuration and any other required environment variables.

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the Next.js application on `http://localhost:9002`.

## Available Scripts

-   `npm run dev`: Starts the Next.js development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server in watch mode.

## Project Structure

-   `src/app/`: Contains the main application pages and layouts, following the Next.js App Router structure.
-   `src/components/`: Shared UI components used across the application.
-   `src/lib/`: Utility functions, type definitions, and mock data.
-   `src/ai/`: Genkit flows and AI-related logic.
-   `public/`: Static assets like images and fonts.
-   `tailwind.config.ts`: Configuration file for Tailwind CSS.
-   `next.config.ts`: Configuration file for Next.js.
