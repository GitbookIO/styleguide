#!/bin/bash

#
# Deploy the documentation using "now"
# We can't deploy the whole repository because the build script is being killed by now.
#

echo Building the documentation
next build

rm -rf .next/to-deploy
mkdir -p .next/to-deploy
cp -R .next/dist/* .next/to-deploy

cp package.json .next/to-deploy/
cp index.js .next/to-deploy/

echo Deploying the documentation
cd .next/to-deploy && now
