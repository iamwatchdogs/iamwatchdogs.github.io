#!/bin/bash

set -e

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Installing bundle dependencies..."
bundle install

log "Making scripts executable..."
chmod +x scripts/*.sh

log "Setup complete!"