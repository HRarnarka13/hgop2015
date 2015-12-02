#!/bin/bash

# Push to docker
docker push arnkari93/tictactoe

# Pull from docker on the test machine.
testport="vagrant@192.168.33.10"
ssh $testport 'bash -s' < test-deploy.sh
