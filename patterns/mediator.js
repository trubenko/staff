var events = (function(){
    var events = {};

    function subscribe(event, cb) {
        if(!events[event]) events[event] = { queue : []};
        let index = events[event].queue.push(cb) - 1;

        return {
            off: function() {
                delete events[event].queue[index];
            },
            events: {
                publish: publish
            }
        }
    }

    function publish(event , data) {
        if (events[event] && events[event].queue.length) {
            events[event].queue.forEach((cb)=>{
                cb(data);
            });
        }
    }

    return {
        subscribe: subscribe,
        publish: publish

    }
})();



var sasha = events.subscribe('hello', function(news){
    console.log('Sasha:', news.title);
});

var sasha1 = events.subscribe('hello', function(news){
    console.log('Sasha 1:', news.title);
});

var sasha2 = events.subscribe('hi', function(news){
    console.log(news.title);
});

events.publish('hello', { title: 'Hello for you'});
sasha.events.publish('hello', { title: 'hello from Sasha'});