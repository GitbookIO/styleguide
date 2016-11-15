#! /usr/bin/env bash

mkdir -p ./static/fonts

rm -rf ./static/fonts/roboto
cp -R ./node_modules/roboto-fontface/fonts/ ./static/fonts/roboto

rm -rf ./static/fonts/octicons
cp -R ./node_modules/octicons/octicons ./static/fonts/octicons
