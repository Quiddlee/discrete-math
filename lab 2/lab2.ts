interface betas {
    [key: string]: number;
}

interface alphabet {
    [key: string]: string;
}
// '011000100'
// ' 0 1 1 0 0 0 1 0 0-1 1 1 0 0 1-0 1 0 0 1 1 1-0 0 0 0 0 1-1 1 1 1 1 0 1 1 1 0-0 0 1 0 1 0 0-'

let initial = ' 0 1 1 0 0 0 1 0 0-1 1 1 0 0 1-0 1 0 0 1 1 1-0 0 0 0 0 1-1 1 1 1 1 0 1 1 1 0-0 0 1 0 1 0 0-'.replace(/\s/g, '');
const betas: betas = {};
const output: betas = {};
const result: number[] = [];
let sum: number = 0;
let outputResult: string[] = [];
let answer: string = '';
const alphabet: alphabet = {
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

const cutString = (str: string) => {
    const subString = str.slice(0, str.indexOf('-'));
    initial = str.slice(str.indexOf('-') + 1, str.length);

    return subString.replace(/-/g, '');
};

const hamming = (str: string): null => {
    if (str.length === 0) return null;

    let decodedResult: string = '';
    let input = cutString(str);
    const betas: betas = {};
    const output: betas = {};
    const result: number[] = [];
    let sum: number = 0;
    let outputResult: string[] = [];

    for (let i = 1; i < input.length; i *= 2) {
        for (let j = i - 1; j < input.length; j += i + i) {
            for (let k = j; k < i + j; k++) {
                if (input[k] !== undefined && k !== 0 && k !== 1 && k !== 3 && k !== 7) {
                    sum ^= +input[k];
                }
            }
        }
    
        output[i] = sum;
        sum = 0;
    }

    for (let i = 1; i < input.length; i *= 2) {
        betas[i] = +input[i - 1];
    }
    
    const betasEntries = Object.entries(betas);
    const outputEntries = Object.entries(output);

    for (let i = 0; i < Object.keys(betas).length; i++) {
        if (betasEntries[i][1] !== outputEntries[i][1]) {
            result.push(+betasEntries[i][0]);
        }
    }

    const error = result.reduce((acc, curr) => acc + curr) - 1;
    for (let i = 0; i < input.length; i++) {
        if (i === error) {
            outputResult.push((+input[i] ^ 1).toString());
        }
    
        if (i !== error) {
            outputResult.push(input[i]);
        }
    }

    for (let i = 0; i < outputResult.length; i++) {
        if (i !== 0 && i !== 1 && i !== 3 && i !== 7) {
            decodedResult += outputResult[i];
        }
    }

    for (const key in alphabet) {
        if (key === decodedResult) answer += alphabet[key];
    }
    
    return hamming(initial);
}
hamming(initial);

console.log(answer);

// for (let i = 1; i < initial.length; i *= 2) {
//     console.log('--', i);
    
//     for (let j = i - 1; j < initial.length; j += i + i) {
//         for (let k = j; k < i + j; k++) {
//             if (initial[k] !== undefined && k !== 0 && k !== 1 && k !== 3 && k !== 7) {
//                 sum ^= +initial[k];
//                 console.log(initial[k], 'k = ' + (k + 1));
//             }
//         }
//     }

//     output[i] = sum;
//     sum = 0;
// }

// console.log(output);
