function once(fn, context) {
    var isExecuted = false;

    return function () {
        if (!isExecuted) {
            fn.apply(context || this, arguments);
        }
        isExecuted = true;
        return isExecuted;
    };
}

// Пример использования
var canOnlyFireOnce = once(function () {
    console.log('Запущено!');
});

canOnlyFireOnce(); // "Запущено!"
canOnlyFireOnce(); // Не запущено