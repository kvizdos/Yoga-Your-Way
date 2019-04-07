#!/bin/bash

VERSION=`git rev-parse --short HEAD`
echo "Latest: $VERSION";
echo "const _LASTCOMMIT = '$VERSION';console.warn('Current Version: ' + _LASTCOMMIT);const _DEV = true;" > version.js

echo "Obfuscating Files!";
javascript-obfuscator ./ --exclude ./node_modules/* --output ./dist --compact true --stringArray false

mkdir ./dist/assets/css

for file in ./assets/css/*.css; do
    fn=${file%.*}
    fn=${fn##*/}
    uglifycss "$file" --ugly-comments > "./dist/assets/css/$fn.css"
    echo minified: "${fn}"
done

cp ./environment/info.js ./environment/info.backup.js
mv ./environment/info.prod.js ./environment/info.js

echo "Done obfuscating";