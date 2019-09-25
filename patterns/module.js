let counter = (function(){
    let counter = 0;

    return {
        add: function(){
           ++counter;
        },
        remove: function() {
            --counter;
        },
        showAmount:function() {
            return counter;
        }
    }
})();



counter.add();
counter.add();
counter.add();
counter.add();
counter.add();
console.log(counter.showAmount());


(function(){
    var app = {
        init: function(){
            this.main();
            this.events();
        },
        main: function(){

        },
        events: function(){

        }
    };
    app.init();
})();