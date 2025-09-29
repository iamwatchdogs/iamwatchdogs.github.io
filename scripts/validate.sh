#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to print messages with a timestamp
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to print error messages with a timestamp
error() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
}

log "Starting HTML validation..."

# Check if _site directory exists
if [ ! -d "_site" ]; then
    log "Building Jekyll site first..."
    JEKYLL_ENV=production bundle exec jekyll build
fi

log "Running HTMLProofer checks..."
bundle exec htmlproofer ./_site \
    --check-html \
    --check-img-http \
    --check-opengraph \
    --report-invalid-tags \
    --report-missing-names \
    --report-script-embeds \
    --report-missing-doctype \
    --report-eof-tags \
    --check-favicon \
    --allow-hash-href

# Check exit status
if [ $? -eq 0 ]; then
    log "✓ HTML validation passed!"
    exit 0
else
    error "✗ HTML validation failed."
    exit 1
fi