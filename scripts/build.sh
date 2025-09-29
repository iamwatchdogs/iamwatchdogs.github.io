#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to print messages with a timestamp
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Cleaning previous build..."
bundle exec jekyll clean

log "Building Jekyll site for production..."
JEKYLL_ENV=production bundle exec jekyll build --trace

log "Build complete! Output directory: _site/"