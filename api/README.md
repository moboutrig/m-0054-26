# API Directory

This directory contains the serverless functions (API routes) for the application.

## Security Notes

### `api/db.json`
**Important:** The `api/db.json` file stores the website's content. It is crucial that this file is **NOT** publicly accessible through a direct URL.

**Deployment Configuration:**
When deploying this application, ensure your hosting provider (e.g., Vercel, Netlify, AWS Amplify, etc.) is configured so that `api/db.json` can only be accessed and modified by the serverless functions defined in this directory (e.g., `api/content.ts`). It should not be directly downloadable or viewable by website visitors.

- **Vercel:** By default, files outside of designated public directories (like `public`) are not directly accessible. Ensure `api/db.json` is not in such a public directory and that no rewrite rules inadvertently expose it. Serverless functions can access it via `fs` module.
- **Netlify:** Similar to Vercel, files not in the `publish` directory are generally not served directly. Functions can access files deployed with them.
- **Other platforms:** Consult your hosting provider's documentation on how to protect files from direct public access while allowing server-side function access.

Failure to secure `api/db.json` could lead to unauthorized viewing or modification of your site's content.
