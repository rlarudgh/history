#!/bin/bash
set -euo pipefail

echo "=========================================="
echo "🏗️  Building Astro Project"
echo "=========================================="

if ! command -v bun &> /dev/null; then
    echo "❌ Error: bun is not installed"
    exit 1
fi

echo "📦 Installing dependencies..."
bun install

echo "🔨 Building static site..."
bun run build

echo ""
echo "✅ Build completed successfully!"
echo "📁 Output directory: dist/"
