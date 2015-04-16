

var template =  {  
   "githubId":"",
   "name":"",
   "full_name":"",
   "url":"",
   "created_at":"",
   "updated_at":"",
   "languages":[  
   ],
   "technologies":[  
   ],
   "friendly_name":"",
   "description":"",
   "solutions":[  
   ],
   "featured":false
};
var crypto = require('crypto');

var genhash = function(str) {
  var shasum = crypto.createHash('sha1');
  shasum.update(str);
  return shasum.digest('hex');
};

var x = function(raw) {
  var doc = JSON.parse(JSON.stringify(template));
  doc._id = genhash(raw.url);
  doc.url = raw.url;
  doc.type= raw.type;
  doc.technologies = raw.product.split(",");
  doc.languages = (raw.language.length>0)?raw.language.split(","):[]
  doc.githubId="";
  doc.solutions = raw.topic.split(",");
  doc.description = raw.description;
  doc.created_at = raw.date;
  doc.updated_at = raw.date;
  doc.name = raw.title;
  doc.friendly_name = "";
  doc.imageurl = raw.imageurl;
  return doc;
}

module.exports = x;

