export class SynacError extends Error {
    constructor(message: string, private position: Position) {
        super(message);
    }
    toString() {
        return `${global.currentPath}:${this.position.rowBegin}:${this.position.columnBegin} - \x1b[38;2;236;0;0m${this.constructor.name}\x1b[39m: ${this.message}
    ${global.sourceMap.get(global.currentPath)![this.position.rowBegin - 1]}
    ${' '.repeat(this.position.columnBegin - 1)}\x1b[38;2;236;0;0m${'~'.repeat(this.position.columnEnd - this.position.columnBegin)}\x1b[39m`;
    }
}
export class SynacTypeError extends SynacError {
    static unexpectedVoidError(position: Position) {
        return new SynacTypeError('Unexpected void', position);
    }
}