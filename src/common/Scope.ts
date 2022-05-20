import llvm from 'llvm-bindings';
import Module from './Module';

export interface Symbols {
    [key: string]: llvm.Value | llvm.Function | Module,
    [key: symbol]: llvm.BasicBlock
}
class Scope {
    constructor(parent?: Scope, injectSymbols?: Symbols) {
        this.parent = parent;
        if (injectSymbols) this.symbols = injectSymbols;
    }
    parent?: Scope;
    private symbols: Symbols = {};
    getSymbol(identifier: string): llvm.Value | llvm.Function | Module {
        const symbol = this.symbols[identifier];
        if (!symbol) throw Error();
        return symbol;
    }
    getType(identifier: string): llvm.Type {
        const symbol = this.symbols[identifier];
        if (!symbol) throw Error();
        if (!(symbol instanceof llvm.Type)) throw Error();
        return symbol;
    }
    getVariable(identifier: string): llvm.Value {
        const symbol = this.symbols[identifier];
        if (!symbol) throw Error();
        if (!(symbol instanceof llvm.Value)) throw Error();
        return symbol;
    }
    getFunction(identifier: string): llvm.Function {
        const symbol = this.symbols[identifier];
        if (!symbol) throw Error();
        if (!(symbol instanceof llvm.Function)) throw Error();
        return symbol;
    }
    getModule(identifier: string): Module {
        const symbol = this.symbols[identifier];
        if (!symbol) throw Error();
        if (!(symbol instanceof Module)) throw Error();
        return symbol;
    }
    getBreakBlock(): llvm.BasicBlock {
        const symbol = this.symbols[Symbol.for('break')];
        if (!symbol) throw Error();
        return symbol;
    }
    getContinueBlock(): llvm.BasicBlock {
        const symbol = this.symbols[Symbol.for('continue')];
        if (!symbol) throw Error();
        return symbol;
    }
    import(identifier: string, symbol: llvm.Value | llvm.Function | Module) {
        this.symbols[identifier] = symbol;
    }
}
export default Scope;