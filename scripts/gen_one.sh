#!/bin/bash
# Sequential image generation with per-image timeout (rate-limit safe)
IMG_DIR="/home/z/my-project/public/images"

gen() {
  local name="$1"; local size="$2"; shift 2
  local prompt="$*"
  if [ -f "$IMG_DIR/$name.png" ] && [ -s "$IMG_DIR/$name.png" ]; then echo "skip $name"; return; fi
  for attempt in 1 2 3; do
    if timeout 75 z-ai image -p "$prompt" -o "$IMG_DIR/$name.png" -s "$size" > /dev/null 2>&1; then
      echo "OK $name"; sleep 3; return
    fi
    rm -f "$IMG_DIR/$name.png"
    echo "retry$attempt $name"; sleep 8
  done
  echo "FAIL $name"
}

"$@"
echo "=== BATCH DONE ==="