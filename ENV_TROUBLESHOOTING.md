# Environment Variables Troubleshooting

## Why `.env.local` might not be loading

### 1. File Location
Make sure `.env.local` is in the **root directory** of your project (same level as `package.json`):

```
date-night/
├── .env.local          ← Should be here
├── package.json
├── api/
│   └── generate-idea.js
└── src/
```

### 2. File Format
Your `.env.local` should look like this (no quotes, no spaces around `=`):

```bash
HUGGINGFACE_API_KEY=your_actual_api_key_here
```

**Wrong:**
```bash
HUGGINGFACE_API_KEY = "your_key"  # ❌ Has spaces and quotes
HUGGINGFACE_API_KEY=your_key      # ✅ Correct
```

### 3. Vercel Dev Must Be Running
The `.env.local` file is only loaded when you run `vercel dev`. If you're only running `npm run dev` (Vite), the environment variables won't be available to the API routes.

**Solution:** Run both servers:
```bash
npm run dev:full
```

Or separately:
```bash
# Terminal 1
npm run dev

# Terminal 2
vercel dev
```

### 4. Restart After Changes
After creating or modifying `.env.local`, you must:
1. Stop `vercel dev` (Ctrl+C)
2. Start it again: `vercel dev`

### 5. Verify It's Loading
Add a temporary console.log to check:

```javascript
// In api/generate-idea.js, temporarily add:
console.log('API Key exists:', !!process.env.HUGGINGFACE_API_KEY)
console.log('API Key length:', process.env.HUGGINGFACE_API_KEY?.length)
```

### 6. Check Variable Name
Make sure the variable name matches exactly:
- ✅ `HUGGINGFACE_API_KEY`
- ❌ `HUGGING_FACE_API_KEY` (wrong)
- ❌ `HF_API_KEY` (wrong)

### 7. File Permissions
On some systems, `.env.local` might have incorrect permissions. Make sure it's readable.

## Quick Test

1. Create `.env.local` in the root:
   ```bash
   echo "HUGGINGFACE_API_KEY=test_key_123" > .env.local
   ```

2. Restart `vercel dev`

3. Make a test API call and check the console logs

## Alternative: Use Vercel CLI to Set Variables

You can also set environment variables using Vercel CLI:

```bash
vercel env add HUGGINGFACE_API_KEY
```

This will prompt you to enter the value and select which environments to apply it to.

## Production Deployment

For production on Vercel:
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add `HUGGINGFACE_API_KEY` with your value
4. Select all environments (Production, Preview, Development)
5. Redeploy


