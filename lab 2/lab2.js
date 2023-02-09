"use strict";
// '011000100'
// ' 0 1 1 0 0 0 1 0 0-1 1 1 0 0 1-0 1 0 0 1 1 1-0 0 0 0 0 1-1 1 1 1 1 0 1 1 1 0-0 0 1 0 1 0 0-'
let initial = ' 0 0 0 1 1 1 0-1 1 1 0 1 0-0 0 1 0 1 1 1-1 1 0 0 1 1 1 0 0-0 0 0 0 1 0'.replace(/\s/g, '');
let answer = '';
const controlBits = [0, 1, 3, 7, 15];
const alphabet = {
    '000': '_',
    '100': 'т',
    '0011': 'и',
    '0101': 'о',
    '0111': 'с',
    '1010': 'п',
    '1101': 'р',
    '1110': 'е',
    '00100': 'в',
    '00101': 'й',
    '01000': 'я',
    '01100': 'н',
    '01101': 'у',
    '10110': 'к',
    '11110': 'д',
    '11111': 'а',
    '010010': 'ь',
    '010011': 'ы',
    '101110': 'г',
    '101111': 'ж',
    '110000': 'м',
    '110001': 'л',
    '110010': 'ч',
    '1100110': 'ц',
    '1100111': 'з',
    '-': '-'
};
const cutString = (str) => {
    let subString;
    if (str.match('-'))
        subString = str.slice(0, str.indexOf('-'));
    else
        subString = str;
    initial = str.slice(str.indexOf('-') + 1);
    return subString.replace(/-/g, '');
};
// const cutString = (str: string) => {
//     const subString = str.slice(0, str.indexOf('-'));
//     initial = str.slice(str.indexOf('-') + 1, str.length);
//
//     return subString.replace(/-/g, '');
// };
const hamming = (str) => {
    if (!str.match(/\d/))
        return null;
    let decodedResult = '';
    let input = cutString(str);
    const betas = {};
    const betasMod = {};
    const betasDifference = [];
    let fixedBits = [];
    for (let i = 1; i < input.length; i *= 2) {
        let sum = 0;
        for (let j = i - 1; j < input.length; j += i + i) {
            for (let k = j; k < i + j; k++) {
                if (input[k] !== undefined && !controlBits.includes(k)) {
                    sum ^= +input[k];
                }
            }
        }
        betasMod[i] = sum;
        betas[i] = +input[i - 1];
    }
    const betasEntries = Object.entries(betas);
    const betasModEntries = Object.entries(betasMod);
    for (let i = 0; i < Object.keys(betas).length; i++) {
        if (betasEntries[i][1] !== betasModEntries[i][1]) {
            betasDifference.push(+betasEntries[i][0]);
        }
    }
    const error = betasDifference.reduce((acc, curr) => acc + curr) - 1;
    for (let i = 0; i < input.length; i++) {
        if (i === error) {
            fixedBits.push((+input[i] ^ 1).toString());
        }
        if (i !== error) {
            fixedBits.push(input[i]);
        }
    }
    for (let i = 0; i < fixedBits.length; i++) {
        if (!controlBits.includes(i)) {
            decodedResult += fixedBits[i];
        }
    }
    for (const key in alphabet) {
        if (key === decodedResult)
            answer += alphabet[key];
    }
    return hamming(initial);
};
hamming(initial);
console.log(answer);
