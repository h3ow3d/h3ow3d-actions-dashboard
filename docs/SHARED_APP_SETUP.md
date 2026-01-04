# Shared GitHub App Setup Guide

## Overview
This guide walks you through completing the shared GitHub App setup for "Actions Dashboard by StackGoBrr".

## Prerequisites
- GitHub App already created: "Actions Dashboard by StackGoBrr" (App ID: 2594325)
- App slug needed (find at `https://github.com/settings/apps/YOUR-APP-SLUG`)

## Step 1: Configure GitHub Repository Variables

Add the following repository variable in GitHub:
`Settings → Secrets and variables → Actions → Variables → New repository variable`

**Variable Name**: `GITHUB_APP_SLUG`
**Value**: Your app slug (e.g., `actions-dashboard-by-stackgobrr`)

## Step 2: Update GitHub App Settings

In your GitHub App settings (`https://github.com/settings/apps/actions-dashboard-by-stackgobrr`):

### Callback URL
Add this to "Callback URL" field:
```
https://actions.dashboard.stackgobrr.com/auth/github/callback
```

### Webhook Configuration
- **Webhook URL**: (Already configured from deployment output)
- **Webhook secret**: (Already configured as `WEBHOOK_SECRET`)
- **Webhook events**:
  - ✅ Pull request
  - ✅ Workflow job
  - ✅ Workflow run

### Permissions
- Actions: **Read-only**
- Contents: **Read-only**
- Metadata: **Read-only** (automatic)
- Pull requests: **Read-only**

## Step 3: Install React Router (Pending)

The OAuth callback flow requires React Router. This needs to be:
1. Install `react-router-dom`
2. Setup routes in App.jsx
3. Add route for `/auth/github/callback` → `SharedAppAuth` component

## Step 4: Update useAuth Hook (Pending)

Add support for `shared-app` auth method:
- Check for `shared_app_installation_id` in localStorage
- Return installation ID when auth method is `shared-app`
- SSE will automatically connect using this installation ID

## Step 5: Test the Flow

1. Deploy with `GITHUB_APP_SLUG` variable set
2. Visit landing page - should see "Install GitHub App" button
3. Click button → redirected to GitHub
4. Install app to your account/repos
5. GitHub redirects back to `/auth/github/callback?installation_id=XXX`
6. App stores installation_id and redirects to dashboard
7. Dashboard connects via SSE using installation_id
8. Trigger a workflow → webhook → SSE → instant dashboard update!

## Current Status

✅ Backend fully operational (webhook → Lambda → SSE)
✅ Frontend SSE integration complete
✅ SharedAppAuth component created
✅ Landing page conditional button added
🔨 React Router setup (pending)
🔨 useAuth shared-app support (pending)
🔨 GitHub App slug configuration (pending)

## Files Modified
- `.github/workflows/deploy.yml` - Added `VITE_GITHUB_APP_SLUG` env var
- `src/config/githubApp.js` - Shared app configuration
- `src/components/Auth/SharedAppAuth.jsx` - OAuth callback handler
- `src/components/LandingPage/LandingPage.jsx` - Conditional install button

## Next Steps
Once you provide the app slug, I'll:
1. Set up React Router
2. Update useAuth hook
3. Wire everything together
4. Test the complete flow
