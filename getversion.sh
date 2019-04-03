#!/bin/bash

VERSION=`git rev-parse --short HEAD`
echo "const _LASTCOMMIT = '$VERSION';" > version.js