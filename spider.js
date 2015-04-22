
var request = require('request');
var unfluff = require('unfluff');
var cloudant = require('cloudant')(process.env.COUCH_URL);
var async = require('async');

var dw = cloudant.db.use('dw');

var q = async.queue(function(doc, callback) {
  request(doc.url, function (error, response, body) {
//       console.log(body) // Show the HTML for the Google homepage. 
    try {
      var data = unfluff(body);
      doc.full_name = data.title;
      doc.body = data.text;

    } catch(e) {
      doc.full_name = doc.name;
      doc.body="";
    }

    dw.insert(doc, function(err, d) {
      console.log(d);
      callback(null);
    });  

  });
},5);

q.drain = function() {
  process.exit();
};


dw.list({include_docs:true},function(err, data) {
  for(var i in data.rows) {
    if(data.rows[i].doc.body.length==0) {
      q.push(data.rows[i].doc);
    }

  }
});