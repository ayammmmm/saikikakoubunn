// 3 * ( 1 * ( 5 + 3 ) / 2 )
// 優先順位：'(', ')' > '*', '/' > '+', '-'
// <exp> = <term> [('+'|'-') <term>]
// <term> = <factor> [('*'|'/') <factor>]
// <factor> = <number> | '(' <exp> ')'
// 先頭から順番に構文解析していく

// index 0
let count = 0;

const addCount = () => count += 1;

const nextString = () => stringArray[count];

const number = (): number => {
    const value = nextString();
    console.assert(parseInt(value) == NaN, '数値じゃないからエラーだよ');
    addCount();
    return Number(value);
}

// <exp> = <term> [('+'|'-') <term>]
const exp = () => {
    const value = nextString();
    if (value == '+') {
        addCount();
    }
    if (value == '-') {
        addCount();
    }

}

// <term> = <factor> [('*'|'/') <factor>]
const term = () => {
    const value = nextString();
    if (value == '*') {
        addCount();
    }
    if (value == '/') {
        addCount();
    }
}

// <factor> = <number> | '(' <exp> ')'
const factor = () => {

    const value = nextString();
    if (value == '(') {
        exp();
        addCount();
        // if (value == ')') {

        //     addCount();
        // }
    }

    return number();
}

let stringArray: string[];
// 呼び出し元
const main = (value: string) => {
    stringArray = [...value];
    exp();
}