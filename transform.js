

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
   "topic":[  
   ],
   "featured":false
};
var crypto = require('crypto');

var genhash = function(str) {
  var shasum = crypto.createHash('sha1');
  shasum.update(str);
  return shasum.digest('hex');
};

var split = function(str) {
  var s = str.split(",");
  for(var i in s) {
    s[i] = s[i].replace(/^ +/,"").replace(/ +$/,"");
  }
  return s;
}

var x = function(raw) {
  var doc = JSON.parse(JSON.stringify(template));
  doc._id = genhash(raw.url);
  doc.url = raw.url;
  doc.type= raw.type;
  doc.technologies = split(raw.product);
  doc.languages = (raw.language.length>0)?split(raw.language):[]
  doc.githubId="";
  doc.topic = split(raw.topic);
  doc.description = raw.description;
  doc.created_at = raw.date;
  doc.updated_at = raw.date;
  doc.name = raw.title;
  doc.friendly_name = "";
  doc.imageurl = raw.imageurl;
  doc.level = raw.level;
  return doc;
}

module.exports = x;

