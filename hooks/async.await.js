async function doubleAndAdd(a,b) {
    a = await doubleAfterSec(a);
    b = await doubleAfterSec(b);

    return a + b;
}

doubleAndAdd(1,3).then(console.log);

function doubleAfterSec(param) {
    return new Promise(resolve => {
        setTimeout(()=> resolve(param * 2), 1000)
    })
}