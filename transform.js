// example transformation function



// -- remove leading and trailing quotes
var template =  {  
   "githubId":"10251075",
   "name":"appengine-endpoints-helloendpoints-java-maven",
   "full_name":"GoogleCloudPlatform/appengine-endpoints-helloendpoints-java-maven",
   "url":"https://github.com/GoogleCloudPlatform/appengine-endpoints-helloendpoints-java-maven",
   "created_at":"2013-05-23T18:58:32Z",
   "updated_at":"2014-08-12T13:16:52Z",
   "languages":[  
      "Java",
      "CSS",
      "JavaScript"
   ],
   "technologies":[  
      "App Engine",
      "Endpoints"
   ],
   "friendly_name":"Hello Endpoints Java",
   "description":"Hello Endpoints ....",
   "solutions":[  
      "Mobile",
      "Getting Started"
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
  return doc;
}

module.exports = x;

