#!/bin/bash
WORKINGDIR=`pwd`
export COUCH_URL=https://reader.cloudant.com
export COUCH_DATABASE=dw
export COUCH_TRANSFORM="$WORKINGDIR/transform.js"
cat raw.tsv | couchimport
node spider.js
ccurl -X POST /dw -d @index.json
