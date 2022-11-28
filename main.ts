import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

// index 0
let count = 0;
const addCount = () => count += 1;

const number = (s: string[]) => {
    let value: number = 0;
    for (; count < s.length;) {
        if (isNaN(Number(s[count]))) break;
        value += Number(s[count]);
        addCount();
    }

    return value;
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
            const res = factor(s);
            console.assert(res != 0, '0で割れないよ');
            value /= res;
            continue;
        }
        else if (s[count] == '(' && isNaN(Number(value)) == false) {
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

const flags = parse(Deno.args, {
    string: ['math']
});

console.assert(flags.math, 'example => deno run main.ts --math="3+5"');
if (flags.math) console.log(main(flags.math));
