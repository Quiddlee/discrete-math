'use strict';

const check = 'Щербина Богдан Тарасович';
const probability = {};
const ids = {};
let count = 0;

for (let i = 0; i < check.length; i++) {
    for (let j = 0; j < check.length; j++) {
        if (check[i] === check[j]) {
            count++;
            ids[check[i].toLowerCase()] = count;
        }
    }

    count = 0;
}

for (const count in ids) {
    ids[count] = (+ids[count] / check.length);
}

for (const key in ids) {
    console.log(ids[key]);
}


const sorty = (arr) => {
    return arr.sort(([, a], [, b]) => b - a);
};
const table = sorty(Object.entries(ids));
// const wassup = [0.36, 0.24, 0.19, 0.14];

console.log(table);

// function Huffman(arr, memo = {}) {
//     if (arr.length === 1) return arr[0];
//     const checked = arr.sort((a, b) => a - b);

//     console.log(checked);
    
//     checked[1] = +(checked[0] + checked[1]).toFixed(2);
//     // // checked[checked.length - 2][0] = `${checked[checked.length - 1][0]}, ${checked[checked.length - 2][0]}`;
//     delete checked[0];

//     memo[arr[0]] = 01;

//     return Huffman(checked.filter(elem => elem !== undefined), );
// }
// console.log(Huffman(wassup));

// function rec(target, arr, check = {}) {
//     if (target === 1) return check;

//     check[target] = ;

//     for (const value of arr) {
//         const reminder = target + value;
//         return rec(reminder, arr);
//     }
// }
// console.log(rec(0.07, wassup));