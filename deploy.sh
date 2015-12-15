#!/bin/bash

if [ "$#" -ne 4 ]; then
  echo "Usage: $0 [IP address] [container] [git-hash] [port]"
  exit 1
fi

# Pull from docker on the test machine.
testport="vagrant@$1"
ssh $testport 'bash -s' < test-deploy.sh $2 $3 $4
