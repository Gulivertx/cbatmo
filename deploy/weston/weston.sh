#!/bin/bash
weston &
sleep 4s
export WAYLAND_DISPLAY=wayland-0
export DISPLAY=:1
exec ~/cbatmo/deploy/webkit/.browser --fullscreen http://localhost:3000
