#!/bin/bash
export COUCH_URL=https://reader.cloudant.com
ccurl -X POST /dw -d @index.json
