# Vercel Deployment Configuration

## Changes Made for Vercel Compatibility

### 1. Runtime Migration (Cloudflare → Node.js)
- **Removed**: `@remix-run/cloudflare` and `@remix-run/cloudflare-pages`
- **Added**: `@remix-run/node` and `@remix-run/vercel`
- **Updated**: All route files to use Node.js runtime instead of Cloudflare

### 2. Environment Variables
Changed from `context.cloudflare.env` to `process.env` in:
- `app/root.jsx` - Session secret
- `app/routes/api.set-theme.js` - Session secret
- `app/routes/contact/contact.jsx` - AWS credentials and email config

### 3. Configuration Files
- **Created**: `vercel.json` with Remix framework detection
- **Updated**: `vite.config.js` - Removed Cloudflare dev proxy plugin
- **Updated**: `package.json`:
  - Deploy script changed from Wrangler to `vercel --prod`
  - Node.js version: `>=20.0.0` (supports Node v22)

### 4. Dependencies Updated
- Ran `npm audit fix` to address security vulnerabilities
- Updated browserslist database

## Environment Variables Required

Create a `.env` file (or set in Vercel dashboard) with:

```env
SESSION_SECRET=your-secret-key-here
EMAIL=your-email@domain.com
FROM_EMAIL=portfolio@yourdomain.com
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

## Build Status
✅ **Build successful** - No errors or warnings
✅ **All Cloudflare references removed**
✅ **Node.js runtime configured**
✅ **Ready for Vercel deployment**

## Deployment Instructions

### Option 1: Vercel CLI
```bash
npm run deploy
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import repository: `GitGuru-sudo/Portfolio-`
3. Add environment variables in project settings
4. Deploy

## Known Issues
- Some dev dependencies have vulnerabilities (Storybook-related)
- These don't affect production builds
- Cookie package has a low-severity vulnerability (no fix available yet)

## Testing
```bash
# Build test
npm run build

# Local development
npm run dev
```

All changes have been committed and pushed to GitHub.
