import { Range } from '../parser/applyRange';

export class SynacError extends Error {
    constructor(message: string, private range: Range) {
        super(message);
    }
    toString() {
        return `${global.currentPath}:${this.range.rowBegin}:${this.range.columnBegin} - \x1b[38;2;236;0;0m${this.constructor.name}\x1b[39m: ${this.message}
    ${global.sourceMap.get(global.currentPath)![this.range.rowBegin - 1]}
    ${' '.repeat(this.range.columnBegin - 1)}\x1b[38;2;236;0;0m${'~'.repeat(this.range.columnEnd - this.range.columnBegin)}\x1b[39m`;
    }
}
export class SynacSyntaxError extends SynacError {}
export class SynacTypeError extends SynacError {
    static unexpectedVoidError(range: Range) {
        return new SynacTypeError('Unexpected void', range);
    }
}