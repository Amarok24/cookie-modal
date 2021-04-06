#!/bin/sh
# echo $@

echo "Launching Sass in watch mode"

sass.bat --style=compressed --watch scss:dist/css
