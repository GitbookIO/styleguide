#!/bin/bash

#
# Deploy the styleguide to Heroku through docker
#

echo "Building container"
bob build

img=$(bob detect | head -n 1)
heroku_img="registry.heroku.com/gitbook-styleguide/web"

# Tag & push to heroku
docker tag $img $heroku_img
docker push $heroku_img
