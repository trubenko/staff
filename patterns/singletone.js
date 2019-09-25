let singletonInstance = (function(){
    var elem;
    function Singleton(options) {
        options = options || {};
        this.name = options.name || 'no name';
        this.surname = options.surname || 'no surname';
    }

    function getInstance(options){
        if (!elem) {
            elem = new Singleton(options)
        }

        return elem;
    }

    var _static = {
        getInstance: getInstance
    };

    return _static;

}());


var service = singletonInstance.getInstance({
    name: 'Igor',
    surname: 'trubenko'
});


var service2 = singletonInstance.getInstance({
    name: 'Oleg'
});

console.log(service);
console.log(service2);