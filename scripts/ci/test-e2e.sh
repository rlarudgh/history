#!/bin/bash
set -euo pipefail

echo "=========================================="
echo "🧪 Running E2E Tests (Playwright)"
echo "=========================================="

if ! command -v bun &> /dev/null; then
    echo "❌ Error: bun is not installed"
    exit 1
fi

echo "📦 Installing dependencies..."
bun install

echo "🎭 Installing Playwright browsers..."
bunx playwright install chromium

echo "🔨 Building project..."
bun run build

echo "🧪 Running E2E tests..."
bun run test:e2e

echo ""
echo "✅ All E2E tests passed!"
