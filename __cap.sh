#!/bin/sh
# capture sementara: screenshot section portfolio di 3 lebar mobile
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
for W in 320 390 500; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars \
    --window-size=$((W+40)),900 --virtual-time-budget=9000 \
    --screenshot=/tmp/c$W.png "http://localhost:5175/__shot.html?w=$W" >/dev/null 2>&1
done
ls -la /tmp/c320.png /tmp/c390.png /tmp/c500.png
