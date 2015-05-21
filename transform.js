

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
   "featured":false,
   "body": "",
   "related": [],
   "githuburl": "",
   "videourl": "",
   "demourl": "",
   "documentationurl": "",
   "otherurl": ""
};
var crypto = require('crypto');

var genhash = function(str) {
  var shasum = crypto.createHash('sha1');
  shasum.update(str);
  return shasum.digest('hex');
};

var split = function(str) {
  str = str.replace(/,$/,"");
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
  if(raw.related && raw.related.length >0) {
    raw.related = raw.related.split(",");
    for(var i in raw.related) {
      raw.related[i] = genhash(raw.related[i]);
    }
    doc.related = raw.related;
  }
  doc.githuburl = raw.githuburl;
  doc.videourl = raw.videourl;
  return doc;
}

module.exports = x;

