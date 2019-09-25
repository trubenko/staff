Pattern Singleton
var SingletonTest = (function() {
  var instance;

  function createInstance(options) {
      options = options || {};
      this.name = options.name || 'Name';
      this.surname = options.suranme || "Trubenko";
  }

  var _static = {
    getInstance: function(options) {
      if (!instance) {
          instance =  new createInstance(options)
      };
      return instance;
    }
  }

  return _static;
}())

var obj1 = SingletonTest.getInstance({name: 'Oled'});

console.log(obj1);
