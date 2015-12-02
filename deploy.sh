#!/bin/bash

# Push to docker
docker push $1

# Pull from docker on the test machine.
testport="vagrant@$2"
ssh $testport 'bash -s' < test-deploy.sh $1 $2
