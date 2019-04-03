#!/bin/bash

VERSION=`git rev-parse --short HEAD`
echo "Latest: $VERSION";
echo "const _LASTCOMMIT = '$VERSION';console.log('Current Version: ' + _LASTCOMMIT);" > version.js