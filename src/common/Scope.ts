import * as llvm from '../llvm';
import Class from './Class';

export interface Symbols {
    [key: string]: llvm.Type | llvm.Value | llvm.Function | Class | Scope,
    [key: symbol]: llvm.Function | llvm.BasicBlock | llvm.Value
}
class Scope {
    constructor(parent?: Scope, injectSymbols?: Symbols) {
        this.parent = parent;
        if (injectSymbols) this.symbols = { ...injectSymbols };
    }
    parent?: Scope;
    private symbols: Symbols = {};
    getSymbol(identifier: (string | symbol) | string[]): any {
        const symbol = Array.isArray(identifier)
            ? identifier.length > 1
                ? this.getScope(identifier[0])?.getSymbol(identifier.slice(1))
                : this.getSymbol(identifier[0])
            : this.symbols[identifier] ?? this.parent?.getSymbol(identifier);
        if (!symbol) throw new Error(`${new String(identifier)} is not defined`);
        return symbol;
    }
    getType(identifier: string | string[]): llvm.Type {
        const symbol = this.getSymbol(identifier);
        if (symbol instanceof Class) return symbol.struct.getPointerTo();
        if (!(symbol instanceof llvm.Type)) throw new Error(`${identifier} is not type`);
        return symbol;
    }
    getVariable(identifier: string | string[]): llvm.Value {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof llvm.Value)) throw new Error(`${identifier} is not variable`);
        return symbol;
    }
    getFunction(identifier: string | string[]): llvm.Function {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof llvm.Function)) throw new Error(`${identifier} is not function`);
        return symbol;
    }
    getClass(identifier: string | string[]): Class {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof Class)) throw new Error(`${identifier} is not class`);
        return symbol;
    }
    getScope(identifier: string | string[]): Scope {
        const symbol = this.getSymbol(identifier);
        if (!(symbol instanceof Scope)) throw new Error(`${identifier} is not scope`);
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
    setFunctionContext(functionContext: llvm.Function) {
        this.symbols[Symbol.for('functionContext')] = functionContext;
    }
    getFunctionContext(): llvm.Function {
        const symbol = this.getSymbol(Symbol.for('functionContext'));
        if (!(symbol instanceof llvm.Function)) throw new Error();
        return symbol;
    }
    setThis(This: llvm.Value) {
        this.symbols[Symbol.for('this')] = This;
    }
    getThis(): llvm.Value {
        const symbol = this.getSymbol(Symbol.for('this'));
        if (!(symbol instanceof llvm.Value)) throw new Error(`this can only be used within a method`);
        return symbol;
    }
    import(identifier: string, symbol: llvm.Type | llvm.Value | llvm.Function | Class | Scope) {
        this.symbols[identifier] = symbol;
    }
}
export default Scope;