#!/bin/bash

export ACCEPTANCE_URL=http://$1:$2
ssh vagrant@$1 'bash -s' < restart-docker.sh
echo "Done"
grunt mochaTest:load
