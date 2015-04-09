#!/bin/bash
export COUCH_URL=https://reader.cloudant.com
export COUCH_DATABASE=dw
export COUCH_TRANSFORM=/Users/glynnb/projects/dw/transform.js
cat raw.tsv | couchimport
