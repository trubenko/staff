var events = (function() {
  var topics = {};

  return {
    subscribe: function(topic, func) {
      if (!topics[topic]) topics[topic] = {
        queue: []
      };
      var index = topics[topic].queue.push(func) - 1;

      return {
        remove: function() {
          delete topics[topic].queue[index]
        }
      }
    },
    publish: function(topic, text) {
      if (!topics[topic] || !topics[topic].queue.length) return;
      var items = topics[topic].queue;

      items.forEach(function(item){
            item(text || {})
      })
    },
    getTopics: function(){
      return topics;
    }
  }
}());

var sub1 = events.subscribe('/page/load', function(obj) {
	console.log('Hello from sub1')
	console.log(obj);

});

var sub1 = events.subscribe('/blabla', function(obj) {
	console.log('blabla')
});

var sub2 = events.subscribe('/page/load', function(obj) {
	console.log('Hello from sub2')
});

var sub3 = events.subscribe('/page/load', function(obj) {
	console.log('Hello from sub3')
});

events.publish('/page/load', {
	url: '/some/url/path' // любой аргумент
});

console.log(events.getTopics());
