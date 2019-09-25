// Anti-Patterns
    // то, как делать не надо
    // всегда использовать var
    // объявление переменных через запятую
    // цикл for объявлять переменные до начала как i, size  i++ не писать писать i+= // i++ 70% дольше работает
    // работа с ДОМ єлементами самая затратная
    // for .. in
        var obj = {
            a: 1,
            b: 2,
            toString: function() {...}
        }

        for (var prop in obj) {
            console.log(obj[prop]);
        }

        for (var prop in obj) {
            if(obj.hasOwnProperty(prop)) { // не лезет в прототип
                console.log(obj[prop]);
            }
        }
    // встроенные классы
        Array.prototype.duplicate = function() {} // Anti-pattern

        if (typeof Object.prototype.duplicate !== 'function') { // good approach
            Array.prototype.duplicate = function() {

            }
        }

    // switch case / if else
        // писать break всегда

    // писать === вместо ==
    // второй параметр для parseInt() - система числения
    // документирование кода



// Patterns
    // готовые решения, которые упрощают жизнь
    // 1. модуль - инкапсуляция реализуется, сделать метод приватным
        var Obj = Obj || {};

        var obj = {
            prop: 1, // public
            getProp: function() { // public method
                return this.prop;
            }
        }

        object.prop = 2; // переписали случайно
        console.log(obj)

        function Gadget() {
            this.name = "iphone"; // public
            this.stretch = function() { // public
                return 'iPad'
            }
        }

        var gadget = new Gadget() // создание экземпляра класса

        function Gadget() {
            var name = "iphone"; // private
            this.stretch = function() { // public getter привелигирован метод - добраться к частнім свойстам
                return  name
            }
            function stretch() { // private method
                return name;
            }
            this.foo = function() { // привелигирован метод
                return stretch();
            }

            // статическое свойство / метод

        }


        function Gadget() {
            var specs = {
                width: 400,
                height: 500,
                color: "white"
            };

            this.getSpecs = function() {
                return specs;
            }
        }

        var gadget = new Gadget(),
            specs = gadget.getSpecs();
            specs.color = "red" // перезаписали приватное значение

        // принцип минимальных полномочий - возвращать не объект, а конкретное значание Color

        var obj =(function (){
            var name = "name";

            return { // шаблон открытия модуля
                getName = function() {
                    return name;
                }
            }
        }());


        var obj;

        (function (){
           var astr = '[object Array]',
                toString = Object.prototype.toString;

           // is Array
           function isArray(a) {
               return toString().call(a) === asrt;
           }

           // indexOf
           function indexOf(array, needle) {
                var i = 0, size = arr.legth;
                for (; i < size; i +=1 ){
                    if (array[i] === needle) {
                        return i
                    }
                }
                return -1;
           }

           return obj = {
               isArray: isArray,
               indexOf: indexOf
           }

        }());

        console.log (obj.isArray([1,2]));


        var BasketModule = (function(){
            var sum = 0, goods = [], outerModule = ProductModule;


            return {
                addProduct: function(good){
                    goods.push(good);
                },
                getPriceProduct: function () {
                    var i = 0, size  = goods.length;
                    for (i = 0; i<size; i += 1) {
                        console.log(goods[i].name, goods[i].price);
                    }
                }
            }
        }());

        var bread = {
            name: 'bread',
            price: 300;
        }

        BasketModule.addProduct(bread);
        BasketModule.getPriceProduct();

        var Gadget = function() {};

        Gadget.isShiny = function() { // приватная ф-ция
            return 'your bet';
        }
        var gadget = newGadget(); // eкземпляр класса
        console.log(gadget.isShiny()) // undefined потому что непосредственно в Gadget


        Gadget.prototype.isShiny = function() {
            return Gadget.isShiny.call(this);
        }




    // 2. синглтон





    // 3. обзервер (наблюдатель)