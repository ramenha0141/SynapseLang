class SynacError extends Error {
    constructor(message: string, private position: Position) {
        super(message);
    }
    toString() {
        return `${global.currentPath}:${this.position.rowBegin}:${this.position.columnBegin} - ${this.constructor.name}: ${this.message}
    ${global.sourceMap.get(global.currentPath)![this.position.rowBegin]}
    ${' '.repeat(this.position.columnBegin)}\x1b[31m${'~'.repeat(this.position.columnEnd - this.position.columnBegin)}\x1b[39m`;
    }
}
class SynacTypeError extends SynacError {
    static unexpectedVoidError(position: Position) {
        return new SynacTypeError('Unexpected void', position);
    }
}