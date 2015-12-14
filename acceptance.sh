#!/bin/bash
export ACCEPTANCE_URL=http://192.168.33.10:9000

ssh vagrant@192.168.33.10 'bash -s' < restart-docker.sh
echo "Done"
grunt mochaTest:acceptance
