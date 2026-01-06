<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1h159oa7xbUzaJRND0wpXBH-M8WXiU33n

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Cloud

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:

- **Vercel** (Recommended): Connect your Git repo at [vercel.com](https://vercel.com)
- **Netlify**: Connect your Git repo at [netlify.com](https://www.netlify.com)
- **Cloudflare Pages**: Connect your Git repo at [pages.cloudflare.com](https://pages.cloudflare.com)

All platforms support automatic deployments from Git pushes.
