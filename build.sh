#!/bin/bash
set -e

echo "Building with Vite..."
npx vite build

echo "Build completed successfully!"
ls -la dist/
