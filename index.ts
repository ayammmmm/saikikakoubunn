// 3 * ( 1 * ( 5 + 3 ) / 2 )
// 優先順位：'(', ')' > '*', '/' > '+', '-'
// <exp> = <term> [('+'|'-') <term>]
// <term> = <factor> [('*'|'/') <factor>]
// <factor> = <number> | '(' <exp> ')'
// 先頭から順番に構文解析していく

// index 0
let count = 0;
const addCount = () => count += 1;

const number = (s: string[]) => {
    let value: number = 0;
    for (; count < s.length;) {
        if (Number(s[count]) != NaN) break;
        value += Number(s[count]);
        addCount();
    }
    return Number(value);
}

// <exp> = <term> [('+'|'-') <term>]
const exp = (s: string[]): number => {
    let value = term(s);
    for (; count < s.length;) {
        if (s[count] == '+') {
            addCount();
            value += term(s);
            continue;
        }
        if (s[count] == '-') {
            addCount();
            value -= term(s);
            continue;
        }
        return value;
    }

    return value;
}

// <term> = <factor> [('*'|'/') <factor>]
const term = (s: string[]): number => {
    let value = factor(s);
    for (; count < s.length;) {
        if (s[count] == '*') {
            addCount();
            value *= factor(s);
            continue;
        }
        else if (s[count] == '/') {
            addCount();
            value /= factor(s);
            continue;
        }
        else if (s[count] == '(' && Number(value) != NaN) {
            value *= factor(s);
            continue;
        }
        else {
            break;
        }
    }
    return value;
}

// <factor> = <number> | '(' <exp> ')'
const factor = (s: string[]): number => {
    if (s[count] == '(') {
        addCount();
        const value = exp(s);
        if (s[count] == ')') {
            addCount();
        }
        return value;
    }

    return number(s);
}

// 呼び出し元
const main = (value: string) => {
    let stringArray: string[] = [...value];
    return exp(stringArray);
}


// テストコード
Deno.test("saikikakoubun Test", () => {
    const res = main('3*(1*(5+3)/2)');

    console.log(res);

    if (res != 12) {
        throw Error("res should be equal to 12");
    }
});