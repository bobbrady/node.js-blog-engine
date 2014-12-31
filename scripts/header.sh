#!/bin/bash

for f in ./app/**/*.js; do
  cat scripts/header_for_js.txt $f > $f.new
  mv $f.new $f
  echo "Prepended header to $f"
done


for f in ./app/views/**/*.html; do
  cat scripts/header.html $f > $f.new
  mv $f.new $f
  echo "Prepended header to $f"
done
