// 3 * ( 1 * ( 5 + 3 ) / 2 )
// 優先順位：'(', ')' > '*', '/' > '+', '-'
// <exp> = <term> [('+'|'-') <term>]
// <term> = <factor> [('*'|'/') <factor>]
// <factor> = <number> | '(' <exp> ')'
// 先頭から順番に構文解析していく

let stock: number[] = [];
let result = 0;

// 計算できるフラグ
let isMath = false;

// index 0
let count = 0;
const addCount = () => count += 1;

const nextString = () => stringArray[count];

const number = () => {
    let value: number = 0;
    for (let i = 0; i < stringArray.length; i++) {
        if (parseInt(nextString())) break;
        value += Number(nextString()) + 10 * i;
    }
    return value;
}

// <exp> = <term> [('+'|'-') <term>]
const exp = () => {
    const value = nextString();
    if (value == '+') {
        addCount();
        if (stringArray.length <= count) return;
    }
    if (value == '-') {
        addCount();
        if (stringArray.length <= count) return;
    }

    term();
}

// <term> = <factor> [('*'|'/') <factor>]
const term = () => {
    const value = nextString();
    if (value == '*') {
        addCount();
        if (stringArray.length <= count) return;
    }
    if (value == '/') {
        addCount();
        if (stringArray.length <= count) return;
    }

    factor();
}

// <factor> = <number> | '(' <exp> ')'
const factor = () => {

    const value = nextString();
    if (value == '(') {
        exp();
        addCount();
        if (stringArray.length <= count) return;
        // if (value == ')') {

        //     addCount();
        // }
    }

    number();
}

let stringArray: string[];
// 呼び出し元
const main = (value: string) => {
    stringArray = [...value];
    exp();
}

const calcurate = () => {

}