#!/bin/bash

export ACCEPTANCE_URL=http://$1:$2
grunt mochaTest:load
