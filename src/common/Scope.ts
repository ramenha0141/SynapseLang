import llvm from 'llvm-bindings';
import Module from './Module';

export interface Symbols {
    [key: string]: llvm.Type | llvm.Value | llvm.Function | Module,
    [key: symbol]: llvm.Function | llvm.BasicBlock
}
class Scope {
    constructor(parent?: Scope, injectSymbols?: Symbols) {
        this.parent = parent;
        if (injectSymbols) this.symbols = injectSymbols;
    }
    parent?: Scope;
    private symbols: Symbols = {};
    getSymbol(identifier: (string | symbol) | string[]): any {
        const symbol = Array.isArray(identifier)
            ? identifier.length > 1
                ? this.getModule(identifier[0])?.getSymbol(identifier.slice(1))
                : this.getSymbol(identifier[0])
            : this.symbols[identifier] ?? this.parent?.getSymbol(identifier);
        if (!symbol) throw Error();
        return symbol;
    }
    getType(identifier: string | string[]): llvm.Type {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof llvm.Type)) throw Error();
        return symbol;
    }
    getVariable(identifier: string): llvm.Value {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof llvm.Value)) throw Error();
        return symbol;
    }
    getFunction(identifier: string): llvm.Function {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof llvm.Function)) throw Error();
        return symbol;
    }
    getModule(identifier: string): Module {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof Module)) throw Error();
        return symbol;
    }
    getBreakBlock(): llvm.BasicBlock {
        const symbol = this.getSymbol(Symbol.for('break'));
        return symbol;
    }
    getContinueBlock(): llvm.BasicBlock {
        const symbol = this.getSymbol(Symbol.for('continue'));
        return symbol;
    }
    import(identifier: string, symbol: llvm.Value | llvm.Function | Module) {
        this.symbols[identifier] = symbol;
    }
    setFunctionContext(functionContext: llvm.Function) {
        this.symbols[Symbol.for('functionContext')] = functionContext;
    }
    getFunctionContext(): llvm.Function {
        const symbol = this.getSymbol(Symbol.for('functionContext'));
        if (!(symbol instanceof llvm.Function)) throw Error();
        return symbol;
    }
}
export default Scope;