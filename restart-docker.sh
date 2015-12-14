#!/bin/bash

dockerContainterId=`docker ps -q`
if [ $dockerContainterId ]; then
    echo 'Restarting docker container...'
    docker restart $dockerContainterId
fi
