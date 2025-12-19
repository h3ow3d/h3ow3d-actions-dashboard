# Security

## Overview

This application prioritizes security while maintaining a client-side architecture. All authentication data is stored locally in your browser, and no data is transmitted to external servers (except GitHub API calls with your credentials).

## Security Measures

### 1. Content Security Policy (CSP)

We've implemented a strict Content Security Policy that:
- **Restricts script sources**: Only scripts from our domain can execute
- **Limits API connections**: Only connections to `api.github.com` are allowed
- **Prevents clickjacking**: `frame-ancestors 'none'` prevents the app from being embedded in iframes
- **Blocks XSS attacks**: Mitigates cross-site scripting by controlling resource loading

### 2. Additional Security Headers

- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-Frame-Options: DENY** - Additional clickjacking protection
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information leakage

### 3. Client-Side Storage

**Authentication data is stored in localStorage:**

#### Security Considerations:
- ✅ **No server transmission**: Data never leaves your browser
- ✅ **Same-origin policy**: Only this app can access the data
- ✅ **User control**: You can clear credentials anytime
- ⚠️ **XSS vulnerability**: If an attacker injects malicious scripts, they could access localStorage

#### Mitigation Strategies:
1. **CSP** protects against XSS by restricting script sources
2. **Regular dependency updates** reduce vulnerability exposure
3. **Use on trusted devices** - Don't use on shared/public computers
4. **Keep browser updated** - Latest browsers have better security

### 4. Secure Practices

#### For Users:
- Use this dashboard only on trusted, personal devices
- Keep your browser up to date
- Use the sign-out feature when finished
- Clear browser data if using a shared computer
- Enable 2FA on your GitHub account

#### For Developers:
- Regular `npm audit` and dependency updates
- Review dependencies for known vulnerabilities
- Use Subresource Integrity (SRI) for CDN resources
- Monitor security advisories

## Data Storage

### What's Stored:

**Personal Access Token (PAT) method:**
- `github_token` - Your GitHub personal access token

**GitHub App method:**
- `github_app_id` - App ID
- `github_app_private_key` - Private key (PEM format)
- `github_app_installation_id` - Installation ID
- `github_app_token` - Generated installation token
- `github_app_token_expiry` - Token expiration timestamp

**Demo mode:**
- `demo_mode` - Boolean flag

### Clearing Your Data:

**Option 1: Sign Out Button**
- Click "Sign Out" in the dashboard header
- Removes all authentication data

**Option 2: Browser DevTools**
1. Press F12 (Cmd+Option+I on Mac)
2. Go to Application > Local Storage
3. Delete individual items or clear all

**Option 3: Browser Settings**
- Clear site data through browser settings
- This removes all localStorage for this domain

## Reporting Security Issues

If you discover a security vulnerability, please email the repository owner or create a private security advisory on GitHub. Do not create public issues for security vulnerabilities.

## Security Trade-offs

This is a **client-side** application that directly calls GitHub APIs. The trade-offs are:

### ✅ Advantages:
- No backend means no server-side data breaches
- No data collection or analytics
- Full transparency (code is open source)
- You control your data completely

### ⚠️ Considerations:
- localStorage is accessible to XSS attacks (mitigated by CSP)
- Data persists until explicitly cleared
- Best used on personal, trusted devices
- Requires manual re-authentication if localStorage is cleared

## Best Practices

1. **Use GitHub App authentication** when possible (better token management)
2. **Use fine-grained PATs** with minimal required permissions
3. **Enable 2FA** on your GitHub account
4. **Regular logout** when finished using the dashboard
5. **Monitor your GitHub account** for unusual activity
6. **Keep dependencies updated** (for developers)

## Learn More

- [OWASP localStorage Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [GitHub Token Security](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure)
