import { expectSingleResult, expectEOF } from 'typescript-parsec';
import lexer from './lexer.js';
import parser from './parser.js';
export default (string: string) => expectSingleResult(expectEOF(parser.parse(lexer.parse(string))));