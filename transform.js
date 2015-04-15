

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

var x = function(raw) {
  var doc = JSON.parse(JSON.stringify(template));
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
  return doc;
}

module.exports = x;

