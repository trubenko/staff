function mul(a, b, c) {
    return a * b * c;
}

// double умножает только на два
let double = mul.bind(null, 2 , 3); // контекст фиксируем null, он не используется

console.log( double(3) ); // = mul(2, 3) = 6
console.log( double(4) ); // = mul(2, 4) = 8
console.log( double(5) ); // = mul(2, 5) = 10

// =======================================
let triple = mul.bind(null, 3); // контекст фиксируем null, он не используется

console.log( triple(3) ); // = mul(3, 3) = 9
console.log( triple(4) ); // = mul(3, 4) = 12
console.log( triple(5) ); // = mul(3, 5) = 15