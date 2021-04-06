#!/bin/sh
# echo "Hello"
# echo $@

echo "Building TypeScript project, using tsconfig.json, watching for changes..."

tsc --build --watch
