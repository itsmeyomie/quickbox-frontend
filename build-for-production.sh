#!/bin/bash

echo "========================================"
echo "QuickBox Angular - Production Build"
echo "========================================"
echo ""

echo "[1/3] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed!"
    exit 1
fi

echo ""
echo "[2/3] Building for production..."
npm run build:prod
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi

echo ""
echo "[3/3] Build complete!"
echo ""
echo "Your production build is ready in: dist/quickbox-angular"
echo ""
echo "Next steps:"
echo "1. Update API URL in src/environments/environment.prod.ts if needed"
echo "2. Upload all files from dist/quickbox-angular to your web server"
echo "3. Make sure .htaccess is in the web root (for Apache)"
echo ""
