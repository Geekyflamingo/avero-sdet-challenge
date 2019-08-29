#!/bin/sh

echo 'Installing npm dependencies...'
npm install

echo 'Building mock Avero Public API...'
docker pull avero/sdet-coding-exercise

echo ' Running the Avero Public API...'
docker run -d -p 9000:9000 avero/sdet-coding-exercise

echo 'Runnning the contract tests...'
npm test
