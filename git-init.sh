#!/bin/sh

for name in $(ls -1 -d */); do
  cd "$name"
  git init
  cd ..
done
