#!/bin/bash
set -euo pipefail

echo "=========================================="
echo "🚀 CI Pipeline - Running All Checks"
echo "=========================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Step 1: Lint
echo ""
echo "📋 Step 1/3: Lint"
bash "$SCRIPT_DIR/lint.sh"

# Step 2: Build
echo ""
echo "📋 Step 2/3: Build"
bash "$SCRIPT_DIR/build.sh"

# Step 3: E2E Tests
echo ""
echo "📋 Step 3/3: E2E Tests"
bash "$SCRIPT_DIR/test-e2e.sh"

echo ""
echo "=========================================="
echo "🎉 All CI checks passed!"
echo "=========================================="
