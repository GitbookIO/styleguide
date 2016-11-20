#!/bin/bash

OUTPUT=static/images/logo

# Cleanup folder
rm -rf $OUTPUT
mkdir -p $OUTPUT

# Create text icon
svg2png ./icons/LogoText.svg --output=$OUTPUT/320-text.png --width=320
svg2png ./icons/LogoText.svg --output=$OUTPUT/512-text.png --width=512

# Create base icon
svg2png ./icons/Logo.svg --output=$OUTPUT/1024.png --width=1024 --height=1024
svg2png ./icons/Logo.svg --output=$OUTPUT/512.png --width=512 --height=512
svg2png ./icons/Logo.svg --output=$OUTPUT/256.png --width=256 --height=256
svg2png ./icons/Logo.svg --output=$OUTPUT/128.png --width=128 --height=128
svg2png ./icons/Logo.svg --output=$OUTPUT/64.png --width=64 --height=64
svg2png ./icons/Logo.svg --output=$OUTPUT/32.png --width=32 --height=32
svg2png ./icons/Logo.svg --output=$OUTPUT/16.png --width=16 --height=16

# Optimize PNGs (by a lot ...)
find $OUTPUT/ -name "*.png" | xargs -P 4 -I{} convert {} {}

# Create favicons
convert $OUTPUT/32.png $OUTPUT/favicon.ico
