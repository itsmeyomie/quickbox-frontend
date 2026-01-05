# QuickBox Angular Frontend - Hosting Guide

This guide will help you host the QuickBox Angular frontend application.

## Prerequisites

- Node.js and npm installed
- Angular CLI installed globally (optional, but recommended)
- A web hosting service (Apache, Nginx, or static hosting like Netlify, Vercel, etc.)

## Step 1: Build for Production

### Option A: Using npm script (Recommended)
```bash
cd quickbox-angular
npm run build:prod
```

### Option B: Using Angular CLI directly
```bash
cd quickbox-angular
ng build --configuration production
```

The production build will be created in the `dist/quickbox-angular` directory.

## Step 2: Update API URL (Before Hosting)

Before hosting, update the API URL in `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-domain.com/api' // Update this with your Spring Boot API URL
};
```

Then rebuild:
```bash
npm run build:prod
```

## Step 3: Hosting Options

### Option A: Apache Server

1. **Upload Files**: Upload all files from `dist/quickbox-angular` to your web server's public directory (usually `public_html`, `www`, or `htdocs`)

2. **Add .htaccess**: The `.htaccess` file is already included in the project root. Make sure it's uploaded to your web root directory.

3. **Verify**: Access your website at `https://yourdomain.com`

### Option B: Nginx Server

1. **Upload Files**: Upload all files from `dist/quickbox-angular` to your web server directory (usually `/var/www/html` or `/usr/share/nginx/html`)

2. **Configure Nginx**: Use the provided `nginx.conf` as a reference, or add this to your Nginx server block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist/quickbox-angular;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Restart Nginx**: 
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Option C: Static Hosting Services

#### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build: `npm run build:prod`
3. Deploy: `netlify deploy --prod --dir=dist/quickbox-angular`

#### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Build: `npm run build:prod`
3. Deploy: `vercel --prod`

#### GitHub Pages
1. Build: `npm run build:prod`
2. Install gh-pages: `npm install -g angular-cli-ghpages`
3. Deploy: `ngh --dir=dist/quickbox-angular`

## Step 4: Connect to Spring Boot Backend (Later)

When your Spring Boot backend is hosted:

1. **Update API URL** in `src/environments/environment.prod.ts`:
   ```typescript
   apiUrl: 'https://api.yourdomain.com/api'
   ```

2. **Rebuild**:
   ```bash
   npm run build:prod
   ```

3. **Redeploy** the updated build to your hosting service

## Important Notes

### CORS Configuration
Make sure your Spring Boot backend has CORS configured to allow requests from your frontend domain:

```java
// In your Spring Boot CorsConfig.java
config.addAllowedOrigin("https://yourdomain.com");
```

### Environment Variables
- The production build uses `environment.prod.ts`
- Development uses `environment.ts`
- Always rebuild after changing environment files

### File Structure After Build
```
dist/quickbox-angular/
├── index.html
├── main.[hash].js
├── polyfills.[hash].js
├── styles.[hash].css
├── assets/
└── ... (other generated files)
```

Upload ALL files from this directory to your web server.

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution**: Ensure `.htaccess` (Apache) or Nginx rewrite rules are properly configured

### Issue: API calls failing
**Solution**: 
- Check CORS configuration on backend
- Verify API URL in `environment.prod.ts`
- Check browser console for errors

### Issue: Assets not loading
**Solution**: 
- Ensure all files from `dist/quickbox-angular` are uploaded
- Check file permissions on server
- Verify base href in `index.html`

### Issue: Build fails
**Solution**:
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run build`
- Clear node_modules and reinstall if needed

## Quick Build & Deploy Checklist

- [ ] Update API URL in `environment.prod.ts` (or leave as localhost for now)
- [ ] Run `npm install` to ensure dependencies are up to date
- [ ] Run `npm run build:prod` to create production build
- [ ] Test the build locally (optional): `npx http-server dist/quickbox-angular`
- [ ] Upload all files from `dist/quickbox-angular` to your web server
- [ ] Verify `.htaccess` is in the web root (for Apache)
- [ ] Test the website at your domain
- [ ] Update API URL when backend is ready and rebuild

## Support

For issues or questions, check:
- Angular documentation: https://angular.io/docs
- Your hosting provider's documentation
- Spring Boot CORS configuration
