#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to print messages with a timestamp
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to handle cleanup on exit
cleanup() {
    log "Shutting down Jekyll server..."
    exit 0
}

# Trap SIGTERM and SIGINT for graceful shutdown
trap cleanup SIGTERM SIGINT

# Ensure dependencies are up to date
log "Checking bundle dependencies..."
bundle check || bundle install

# Clean previous build artifacts for a fresh start
log "Cleaning previous build artifacts..."
bundle exec jekyll clean

# Start the Jekyll server
log "Starting Jekyll development server..."
log "Server will be available at http://localhost:4000"
log "Press Ctrl+C to stop"

bundle exec jekyll serve \
    --host 0.0.0.0 \
    --port 4000 \
    --livereload \
    --incremental \
    --drafts \
    --trace