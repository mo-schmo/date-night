# Local Development Guide

This guide explains how to run both the frontend and backend locally for development.

## Prerequisites

1. Node.js (v18 or higher recommended)
2. npm or yarn
3. Vercel CLI (installed automatically with npm install)

## Quick Start

### Option 1: Run Everything Together (Recommended)

This runs both the frontend (Vite) and backend (Vercel API routes) simultaneously:

```bash
npm run dev:full
```

This will start:
- Frontend at `http://localhost:5173`
- Backend API at `http://localhost:3000/api`

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
vercel dev
```
Backend API runs at `http://localhost:3000/api`

## Environment Variables

1. Create a `.env.local` file in the root directory:
```bash
HUGGINGFACE_API_KEY=your_api_key_here
# OR
TOGETHER_API_KEY=your_api_key_here
USE_TOGETHER_AI=true
```

2. The Vercel CLI will automatically load `.env.local` when running `vercel dev`

## API Configuration

The frontend is configured to use `/api` as the base URL, which works in both:
- **Local development**: Vite proxy forwards `/api/*` requests to the Vercel dev server (localhost:3000)
- **Production**: Vercel automatically routes `/api/*` to serverless functions

The Vite configuration includes a proxy that automatically forwards API requests:
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
}
```

This means when you make a request to `/api/generate-idea` from the frontend, Vite will automatically proxy it to `http://localhost:3000/api/generate-idea` where your Vercel dev server is running.

If you need to change the API URL for local development, you can set:
```bash
VITE_API_URL=http://localhost:3000/api
```

**Note**: Make sure both `npm run dev` (Vite) and `vercel dev` are running for the proxy to work correctly.

## Testing the Backend

Once both servers are running:

1. Open `http://localhost:5173` in your browser
2. Navigate to the "Date Ideas" section
3. Click "Generate Custom Idea"
4. Fill out the form and submit

You can also test the API directly:

```bash
curl -X POST http://localhost:3000/api/generate-idea \
  -H "Content-Type: application/json" \
  -d '{
    "mood": "romantic",
    "budget": "medium",
    "location": "New York",
    "timeOfDay": "evening"
  }'
```

## Troubleshooting

### "Cannot find module" errors
- Make sure you've run `npm install`
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### API routes not working
- Ensure `vercel dev` is running
- Check that your `.env.local` file exists and has the correct API keys
- Verify the API route file exists at `api/generate-idea.js`

### Port conflicts
- If port 3000 is in use, Vercel will automatically use the next available port
- Check the terminal output to see which port Vercel is using
- Update `VITE_API_URL` if needed

### CORS errors
- The API route includes CORS headers, but if you see CORS errors:
  - Make sure you're accessing the frontend from the same origin
  - Check that the API URL is correct

## Development Workflow

1. **Start development servers**: `npm run dev:full`
2. **Make changes** to your code
3. **Hot reload** will automatically refresh both frontend and backend
4. **Test changes** in the browser
5. **Check logs** in both terminal windows for errors

## Production Deployment

When ready to deploy:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The same code will work in production without any changes.

