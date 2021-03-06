# Deverloper Centre scripts

This project contains work to create database of web page articles imported from a text file.

* import CSV data into Cloudant
* spider the URLs and embelish the documents with titles and text body
* create Lucene index with facets
* query the data

## Import the data

Run `import.sh`.

## Spider the data to add title and body

Run `node spider.js` to add titles and bodies to the documents. We end up with documents like this:

```
{
  "_id": "79bfbe188108870fd61b3a84f0b2cdcf",
  "_rev": "2-f8791aa4140ede7845cc5fe6f3dece46",
  "githubId": "",
  "name": "Data Migration & Transformation Tools",
  "full_name": "Data Migration & Transformation Tools",
  "url": "https://www.cloudant.com/for-developers/migrating-data/",
  "created_at": "2013-05-23T18:58:32Z",
  "updated_at": "2014-08-12T13:16:52Z",
  "languages": [],
  "technologies": [
    "Cloudant"
  ],
  "friendly_name": "Data Migration & Transformation Tools",
  "description": "",
  "solutions": [
    "ETL"
  ],
  "featured": false,
  "type": "page",
  "body": "How to move data in and out of Cloudant is a common question. This page includes a number of utilities to migrate and transform your data. Note that in most cases, tools that are compatible with Apache CouchDB will also work with Cloudant so are included for your reference.\n\nIf you know of a great tool you'd like us to recommend get in touch!"
}

```

Notice:
* languages is sometimes empty
* I only have one "name" (repeated)
* the timestamps are not real
* the main text from the HTML document is stored in 'body'

## Create the index

Run `./create_index.sh` to create a Lucene index.

The index is built like this:

```
function (doc) {
 if (doc.name) {
   index("name", doc.name, {store:true});
   index("body", doc.body, {store: false});
   for (var i in doc.languages) {
     index("language", doc.languages[i], {store:true, facet:true});
   }  
   for (var i in doc.technologies) {
     index("technology", doc.technologies[i], {store:true, facet:true});
   }
   for (var i in doc.solutions) {
     index("solution", doc.solutions[i], {store:true, facet:true});
   }
   index("type", doc.type, {store:true, facet:true});
 }
};
```

## Query!

### Only the facets

(https://reader.cloudant.com/dw/_design/search/_search/search?q=*:*&limit=0&counts=[%22solution%22,%22technology%22,%22type%22])

* `q=*:*` - set the query string to '*:*' which means 'everything'
* `limit=0` - we don't actually want any search results
* `counts=["solutions","technology","type"]` - return the facet counts for these three fields

### Search the document name

(https://reader.cloudant.com/dw/_design/search/_search/search?q=name:data&limit=10&counts=[%22solution%22,%22technology%22,%22type%22])

To search the page title (name) we use

* `q=name:data` - find documents whose name contains 'data'
* `limit=10` - this time we do want search results
* `counts=["solutions","technology","type"]` - return the facet counts for these three fields


## Search the HTML body

(https://reader.cloudant.com/dw/_design/search/_search/search?q=body:curl+post&limit=10&counts=[%22solution%22,%22technology%22,%22type%22])

We can search the spidered document body itself. Results are returned in "best match first" order.

* `q=body:curl post` - find documents whose body matches "curl post"


## Find only blog posts

(https://reader.cloudant.com/dw/_design/search/_search/search?q=type:blog+AND+name:geospatial&limit=10&counts=[%22solution%22,%22technology%22,%22type%22]

We can limit the search to only blog posts.

* `q=type:blog AND name:geospatial` - find 'blog' documents whose name contains 'geospatial'


## To do

I can't seem to get the "language" facet to work.

