#!/bin/bash

set -e

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Installing bundle dependencies..."
bundle install

log "Installing dependencies for python scripting..."
pip install --break-system-packages beautifulsoup4

log "Making scripts executable..."
chmod +x scripts/*

log "Setup complete!"