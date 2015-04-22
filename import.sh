#!/bin/bash
WD=`pwd`
export COUCH_URL=https://reader.cloudant.com
export COUCH_DATABASE=dw
export COUCH_TRANSFORM="$WD/transform.js"
cat raw.tsv | couchimport
node spider.js
