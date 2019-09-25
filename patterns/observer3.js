// Observer - связать 2 объекта

function Observable() {
  var observers = [];

  this.addObserver = function(observer) {
    observers.push(observer);
  };

  this.sendMessage = function(msg) {
    var i, size = observers.length;
    for (i = 0; i < size; i += 1) {
      observers[i].notify(msg);
    }
  }
}

function Observer(behaviour) {
  this.notify = function(msg) {
    behaviour(msg);
  }
}

var observable = new Observable();
var obs1 = new Observer(function(msg) {
  console.log(msg);
});
var obs2 = new Observer(function(msg) {
  alert(msg);
});

observable.addObserver(obs1);
observable.addObserver(obs2);

setTimeout(function() {
  observable.sendMessage(new Date());
})
