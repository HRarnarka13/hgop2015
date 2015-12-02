#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
rc=$?
if [[ $rc != 0 ]]; then
    echo 'Grunt build failed.'
    exit $rc;
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t arnkari93/tictactoe .
rc=$?
if [[ $rc != 0 ]]; then
    echo 'Docker build failed.'
    exit $rc;
fi

echo "Done"
