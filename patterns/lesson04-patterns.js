// Singleton
    console.log(new String('hello') === new String('hello')); // false, потому что разный экземпляр класса

    function Universe() { // один для всех, чтобы создать 1 экземпляр класса
        // практически - модель
        // создается  {} = this

        if (typeof Universe.instance === 'object') {
            return Universe.instance;
        }

        this.a = 9;
        this.b = 10;

        Universe.instance = this; // cссылку на себя же
        return this;
    }

    var uni1 = new Universe();
    var uni2 = new Universe();
    console.log (uni1 === uni2); // true


    // Via closure
    function Universe() {
        var instance = this;

        this.a = 9;
        this.b = 10;

        Universe = function() {
            return instance;
        }
    }

    var uni1 = new Universe();
    Object.freeze(uni1);
    console.log (uni1 === uni2); // true





// Factory Фабрика. Цель - создавать объект меняя параметры

    function CarMaker(a, b) {
        this.a = a;
        this.b = b;
    }

    var honda = new CarMaker(2,3);
    var toyota = new CarMaker(3,4);

    // через свойства статического класса
    function CarMaker() {}

    CarMaker.prototype.drive = function() {
        return 'I have ' + this.doors + ' doors';
    }

    CarMaker.factory = function(type) {
        var constr = type,
            newCar;

        if (typeof CarMaker[constr].prototype.drive !== 'function') { // CarMaker['convertible']
            CarMaker[constr].prototype = new CarMaker();
        }

        newCar = new CarMaker[constr]();
        return newCar;
    };

    CarMaker.Compact = function() {
        this.doors = 4;
    }

    CarMaker.Convertible = function() {
        this.doors = 6;
    }

    CarMaker.Sub = function() {
        this.doors = 8;
    }

    var toyota = CarMaker.factory('Compact');
    console.log(toyota.drive());
// =========================================
    // Types.js - Constructors used behind the scenes

    // A constructor for defining new cars
    function Car( options ) {

      // some defaults
      this.doors = options.doors || 4;
      this.state = options.state || "brand new";
      this.color = options.color || "silver";

    }

    // A constructor for defining new trucks
    function Truck( options){

      this.state = options.state || "used";
      this.wheelSize = options.wheelSize || "large";
      this.color = options.color || "blue";
    }


    // FactoryExample.js

    // Define a skeleton vehicle factory
    function VehicleFactory() {}

    // Define the prototypes and utilities for this factory

    // Our default vehicleClass is Car
    VehicleFactory.prototype.vehicleClass = Car;

    // Our Factory method for creating new Vehicle instances
    VehicleFactory.prototype.createVehicle = function ( options ) {

      switch(options.vehicleType){
        case "car":
          this.vehicleClass = Car;
          break;
        case "truck":
          this.vehicleClass = Truck;
          break;
        //defaults to VehicleFactory.prototype.vehicleClass (Car)
      }

      return new this.vehicleClass( options );

    };

    // Create an instance of our factory that makes cars
    var carFactory = new VehicleFactory();
    var car = carFactory.createVehicle( {
                vehicleType: "car",
                color: "yellow",
                doors: 6 } );

    // Test to confirm our car was created using the vehicleClass/prototype Car

    // Outputs: true
    console.log( car instanceof Car );

    // Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
    console.log( car );
// =========================================
// Prototype - прочитать еще раз
    function Parent(a) {
        this.a = a;
    }

    Parent.prototype.showText = function() {
        return this.a;
    };

    function Child(b) {
        Parent.call(this);
        this.b = b;
    }

    Child.prototype.sayWord = function() {
        Parent.prototype.showText.call(this);
    }

    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;

    var parent = new Parent('Bob');
    console.log(parent.showText());

    var child = new Child('Frank');
    console.log(child.showText());


// Mixin

    function extend(target) {
        var i, size = arguments.length;
        if (!arguments[1]) return;

        for(i = 1; i < size; i += 1) { // i =1 чтобы не гулять по speaker и не записывать в него свойства, чот уже там
            var source = arguments[i], prop;
            for(prop in source) {
                if (!target[prop] && source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
    }

    var speaker = function() {
        name: "Bob";
    }

    var mover = {

        speak: function() {
            return this.name + " is speaking";
        },

        walk: function() {
            return this.name + " is walking";
        }
    }

    var jumper = {
        jump: function() {
            return this.name + " is jumping";
        }
    }

    extend(speaker, mover, jumper);
    console.log(speaker.jump());


// Facade - структурный паттерн

    function foo() {
        console.log('foo')
    }

    function boo() {
        console.log('boo')
    }

    function parent() { // фасадная функция
       foo();
       boo();
    }


// Decorator - динамический функционал добавить в объект

    function Sale(price) {
        this.price = price || 100;
    }

    Sale.prototype.getPrice = function() {
        return this.price;
    }

    Sale.decorators = {}; // статическое свойство


    Sale.decorators.fedTax = {
        getPrice: function () {
            var price = this.uber.getPrice();
            price += price *5 / 100;
            return price;
        }
    }

    Sale.decorators.quebec = {
        getPrice: function () {
            var price = this.uber.getPrice();
            price += price * 7.5 / 100;
            return price;
        }
    }

    Sale.decorators.money = {
        getPrice: function () {
           return this.uber.getPrice().toFixed(2);
        }
    }

    Sale.prototype.decorate = function(decorate) {
        var F = function() {},
            newObj,
            overrides = this.constructor.decorators[decorator]; // this.constructor = Sale
        F.prototype = this;
        newObj - new F;
        newObj.uber = F.prototype;
        for (i in overrides) {
            if (overrides.hasOwnProperty(i)) {
                newObj[i] = overrides[i];
            }
        }
        return newObj;
    }

    var sale = new Sale(1000);
    sale = sale.decorate('quebec');
    console.log(sale.getPrice());



// Observer - связать 2 объекта

    function Observable() {
        var observers = [];

        this.addObserver = function(observer) {
            observers.push(observer);
        };

        this.sendMessage = function(msg) {
            var i, size = observers.length;
            for(i = 0; i < size; i += 1) {
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
    var obs1 = new Observer(function(msg){
        console.log(msg);
    });
    var obs2 = new Observer(function(msg){
        alert(msg);
    });

    observable.addObserver(obs1);
    observable.addObserver(obs2);

    setTimeout(function() {
        observable.sendMessage(new Date());
    })



// MVC - каждая отдельная функция контроллер (модель, вью, контроллер)

    // 1. задача контроллера - менять модель и слушать событие
    // 2. модель - объект изначально пустой, по событию в контроллере меняем модель
    // 3. модель изменяет view
    // 4. модель слушает изменения контроллера
    // 5. модель - синглтон
    // 6. view - отрисовка вида
    // 7. контроллер - нет никакой бизнесс логики
    // 8. модель - бизнесс логика здесь

/*
    <button id="CalcUser">Compute</button>
    <div id="showResult"></div>
*/


// *** View ***

var view = {
    showNumber: function(num) {
        var el = document.getElementById('showResult');
        el.innerHTML = num;
    }
}



// *** Model ***

var model = {
    number: 0,
    calculate: function(a, b) {
        this.number =  a * b;
        var result = this.number;
        view.showNumber(result); // вызвали view
    }
}


// *** Controller ***
var controller = {
    handleClick: function() {
        model.calculate(3, 6);
    }
}



// *** Init ***
(function(){
    var app = {
        init: function() {
            this.event();
            this.main();
        },
        main: function() {

        },
        event: function() {
            var el = document.getElementById('calcUser');
            el.onclick = controller.handleClick;
        }
    }
    app.init();
}())




// SPA
    // 1. 1 html
    // 2. встроенный шаблонизатор который вставляет кусок хтмл куда надо перерисовать
    // 3. не работаем с ДОМ напрямую
