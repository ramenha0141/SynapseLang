import { expectSingleResult, expectEOF } from 'typescript-parsec';
import lexer from './lexer.js';
import parser from './parser.js';
export default (string: string) => expectSingleResult(expectEOF(parser.parse(lexer.parse(string))));
const string = `import console;
import Math;
import process;
class A {
    constructor() {}
    str: char[1];
    length: int;
}
function main(): void {
    const a: A = new A();
}`;
console.log(JSON.stringify(expectSingleResult(expectEOF(parser.parse(lexer.parse(string))))));