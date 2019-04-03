#!/bin/bash

VERSION=`git rev-parse --short HEAD`
echo "Latest: $VERSION";
echo "const _LASTCOMMIT = '$VERSION';" > version.js