#!/bin/bash

# Pull from docker on the test machine.
testport="vagrant@$1"
ssh $testport 'bash -s' < test-deploy.sh $2 $3
