var items = [
    { name: 'Edward', value: 21 },

    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'Ebward', value: 21 },
    { name: 'The', value: -12 },
    { name: 'Magnetic', value: -4 },
    { name: 'Zeros', value: 37 }
];


// items.sort(function (a, b) {
//     return a.name.charCodeAt(0) - b.name.charCodeAt(0) ;
// });

//Result
// [   { name: 'And', value: 45 },
//     { name: 'Edward', value: 21 },
//     { name: 'Ebward', value: 21 },
//     { name: 'Magnetic', value: -4 },
//     { name: 'Sharpe', value: 37 },
//     { name: 'The', value: -12 },
//     { name: 'Zeros', value: 37 } ]


items.sort(function (a, b) {
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    if (nameA < nameB) //сортируем строки по возрастанию
        return -1;
    if (nameA > nameB)
        return 1;
    return 0 // Никакой сортировки
});

// Result

// [   { name: 'And', value: 45 },
//     { name: 'Ebward', value: 21 },
//     { name: 'Edward', value: 21 },
//     { name: 'Magnetic', value: -4 },
//     { name: 'Sharpe', value: 37 },
//     { name: 'The', value: -12 },
//     { name: 'Zeros', value: 37 } ]



// items.sort(function (a, b) {
//     return b.name.length - a.name.length;
// });


//Result
// [ { name: 'Magnetic', value: -4 },
//     { name: 'Edward', value: 21 },
//     { name: 'Sharpe', value: 37 },
//     { name: 'Ebward', value: 21 },
//     { name: 'Zeros', value: 37 },
//     { name: 'And', value: 45 },
//     { name: 'The', value: -12 } ]


console.log(items);