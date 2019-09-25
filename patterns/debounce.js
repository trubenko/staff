function debounce(f, ms) {

    let timer = null;

    return function (...args) {

        if (timer) {
            console.log(args);
            clearTimeout(timer);
        }

        const onComplete = () => {
            f.apply(this, args);
            timer = null;
        };

        timer = setTimeout(onComplete, ms);
    };
}

function f(x) { console.log(x) }
let ff = debounce(f, 1000);

ff(1); // вызов отложен на 1000 мс
ff(2); // предыдущий отложенный вызов игнорируется, текущий (2) откладывается на 1000 мс

// через 1 секунду появится alert(2)

setTimeout( function() { f(3) }, 1100); // через 1100 мс отложим вызов еще на 1000 мс
setTimeout( function() { f(4) }, 1200); // игнорируем вызов (3)

// через 2200 мс от начала выполнения появится alert(4)