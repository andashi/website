#!/usr/bin/env sh
# Marke neu bauen und in public/ uebernehmen.
set -e
cd "$(dirname "$0")/.."
python3 ../brand/mark.py
cp ../brand/favicon.svg ../brand/favicon-32.png ../brand/favicon-16.png \
   ../brand/apple-touch-icon.png ../brand/logo.png ../brand/logo-alpha.png \
   ../brand/mark-3d-orb.glb public/
echo "brand -> public/"
