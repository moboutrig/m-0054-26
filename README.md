# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/96f629c9-6031-4f68-8bd0-680a3c64b6e3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/96f629c9-6031-4f68-8bd0-680a3c64b6e3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/96f629c9-6031-4f68-8bd0-680a3c64b6e3) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Local Development

This section describes how to set up and run the project locally, including the frontend Vite server and a local Node.js/Express server for the API.

### Environment Setup

1.  **Create Environment File:**
    Create a file named `.env.local` in the root of the project. This file will store your local environment variables.

2.  **Populate `.env.local`:**
    Add the following variables to your `.env.local` file. **Important:** Replace the placeholder values with your own strong, unique secrets for local testing.
    ```env
    CMS_PASSWORD=your_strong_password_here
    SESSION_SECRET=your_very_strong_and_long_session_secret_here_min_32_chars
    # NODE_ENV=development (optional, defaults to 'development' in server.js if not set)
    ```
    - `CMS_PASSWORD`: The password used to log into the CMS.
    - `SESSION_SECRET`: A long, random string (at least 32 characters recommended) used to sign session JWTs.
    The `.env.local` file is already listed in `.gitignore` and should not be committed to your repository.

### Dependencies for Local API Server

Install the following dependencies if you haven't already (they were added in a previous step, but good to list for clarity):
```bash
npm install express cookie-parser cors dotenv
# or if using bun:
# bun install express cookie-parser cors dotenv
```

### Running the Backend (Local API Server)

1.  **Start the Server:**
    Open a terminal in the project root and run:
    ```bash
    node server.js
    ```
2.  **Server Port:**
    The local API server will run on `http://localhost:3001` by default (or the port specified by `PORT` in `.env.local` if you set one). It simulates the Vercel serverless functions environment for your API routes.

### Running the Frontend (Vite Dev Server)

1.  **Start the Server:**
    In a separate terminal, run the Vite development server (as described in the "How can I edit this code?" section):
    ```bash
    npm run dev
    # or if using bun:
    # bun run dev
    ```
2.  **Server Port:**
    The Vite dev server typically runs on `http://localhost:5173`.

### Configuring Vite Proxy for API Requests

To allow the frontend (running on port 5173) to make requests to your local API server (running on port 3001) without CORS issues during development, you need to configure a proxy in your `vite.config.ts`.

1.  **Edit `vite.config.ts`:**
    Open your `vite.config.ts` file and add/modify the `server.proxy` configuration:

    ```typescript
    // vite.config.ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from "path" // Ensure path is imported if you use alias

    export default defineConfig({
      plugins: [react()],
      resolve: { // Example: if you have path aliases
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      server: {
        port: 5173, // Explicitly set port if needed
        proxy: {
          '/api': {
            target: 'http://localhost:3001', // Your local API server
            changeOrigin: true,
            // The rewrite is optional if your server.js routes already include /api prefix
            // If server.js routes are /content, /login, etc., then use:
            // rewrite: (path) => path.replace(/^\/api/, '')
            // Since our server.js uses /api/content, /api/login, etc., no rewrite is strictly needed,
            // but it's good practice to ensure it maps correctly.
            rewrite: (path) => path, // or path.replace(/^\/api/, '/api') which does nothing
          }
        }
      }
    })
    ```

    **Note on `rewrite`:** The `server.js` created in this setup defines routes with the `/api` prefix (e.g., `app.get('/api/content', ...)`). Therefore, the `rewrite` function in `vite.config.ts` can simply be `(path) => path` or can be omitted if the default behavior correctly forwards `/api/*` to `http://localhost:3001/api/*`. If your `server.js` routes *didn't* have the `/api` prefix (e.g., `app.get('/content', ...)`), you would use `rewrite: (path) => path.replace(/^\/api/, '')`. The provided example assumes `server.js` handles routes starting with `/api`.

With this setup, any request from your frontend to `/api/...` will be proxied by the Vite dev server to `http://localhost:3001/api/...`.
