# LLM Date Idea Generator Setup Guide

This guide will help you set up the LLM backend for generating personalized date ideas.

## Quick Start

1. Choose an LLM provider (Hugging Face or Together.ai)
2. Get your API key
3. Configure environment variables
4. Deploy to Vercel

## Option 1: Hugging Face (Recommended for Free Tier)

### Step 1: Get API Key
1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up or log in
3. Navigate to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with "Read" permissions
5. Copy the token

### Step 2: Configure Environment Variables

**For Local Development:**
1. Create a `.env.local` file in the root directory
2. Add your API key:
```
HUGGINGFACE_API_KEY=your_token_here
```

**For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add `HUGGINGFACE_API_KEY` with your token value
4. Select all environments (Production, Preview, Development)
5. Redeploy your application

### Step 3: Test Locally

For local development with Vite, you'll need to use a proxy or run the API route separately. The API route will work automatically when deployed to Vercel.

## Option 2: Together.ai

### Step 1: Get API Key
1. Go to [Together.ai](https://api.together.xyz/)
2. Sign up for an account
3. Navigate to your API keys section
4. Copy your API key

### Step 2: Configure Environment Variables

**For Local Development:**
Create `.env.local`:
```
TOGETHER_API_KEY=your_api_key_here
USE_TOGETHER_AI=true
```

**For Vercel Deployment:**
1. Add `TOGETHER_API_KEY` environment variable
2. Add `USE_TOGETHER_AI=true` environment variable
3. Redeploy

## Model Configuration (Optional)

You can customize which model to use by setting these environment variables:

**For Hugging Face:**
```
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.2
```

**For Together.ai:**
```
TOGETHER_MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1
```

## Testing the API

Once configured, you can test the API by:

1. Starting your development server: `npm run dev`
2. Opening the Date Ideas section
3. Clicking "Generate Custom Idea"
4. Filling out the form and submitting

## Troubleshooting

### "API key not configured" Error
- Make sure your `.env.local` file exists and contains the API key
- For Vercel, ensure environment variables are set in the dashboard
- Restart your development server after adding environment variables

### "Network error" or Timeout
- Check your internet connection
- Verify the API key is correct
- Some models may take longer to respond - try again

### "Too many requests" Error
- You've hit the rate limit for your API provider
- Wait a few minutes and try again
- Consider upgrading your API plan if needed

## Cost Information

- **Hugging Face**: Free tier includes 1,000 requests/month
- **Together.ai**: $25 free credit, then pay-as-you-go (~$0.0001-0.001 per request)
- **Vercel**: Free tier includes 100GB bandwidth

## Next Steps

After setup, the date idea generator will be available in the Date Ideas section. Users can:
- Select mood, budget, location, time of day, and occasion
- Generate personalized date ideas
- See AI-generated ideas alongside static suggestions

