#!/bin/bash
set -euo pipefail

echo "=========================================="
echo "🧹 Running Biome Lint & Format Check"
echo "=========================================="

if ! command -v bun &> /dev/null; then
    echo "❌ Error: bun is not installed"
    exit 1
fi

echo "📦 Installing dependencies..."
bun install

echo "🔍 Running biome check..."
bun run lint

echo ""
echo "✅ Lint check passed!"
