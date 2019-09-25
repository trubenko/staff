var funcObject = {
    name: 'igor',
    add: function( a, b) {
        return a + b
    },
    showText: function(text) {
        return test;
    },
    getName:() => this.name,
};




funcObject.executor = function(property){
    return funcObject[property] && funcObject[property].apply(funcObject, Array.prototype.slice.call(arguments, 1))
};


console.log(funcObject.executor('add', 2,6));
