#!/bin/bash
weston &
sleep 4s
export WAYLAND_DISPLAY=wayland-0
export DISPLAY=:1
exec ~/.browse --fullscreen http://localhost:3000