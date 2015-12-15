#!/bin/bash

# Kill previous docker containers
dockerContainterId=`docker ps -q`
if [ $dockerContainterId ]; then
    echo 'Shuting down the old version of the app.'
    docker kill $dockerContainterId
    docker rm $dockerContainterId
fi

# Pull from docker
echo 'Pulling changes from docker.'
docker pull $1:$2

echo 'Running the new version in docker.'
docker run -p 9000:8080 -d -e "NODE_ENV=production" $1
