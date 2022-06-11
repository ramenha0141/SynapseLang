import BasicBlock from './BasicBlock';
import Function from './Function';
import Type, { FunctionType, PointerType } from './Type';
import Value from './Value';

class Instruction extends Value {
    constructor(type?: Type) {
        super(type ?? Type.getVoidTy());
    }
    print(): string {
        return ``;
    }
}
export default Instruction;
export class RetInst extends Instruction {
    constructor(private value?: Value) {
        super();
    }
    print(): string {
        if (this.value) return `ret ${this.value}`;
        return `ret void`;
    }
}
export class BrInst extends Instruction {
    private distBasicBlock?: BasicBlock;
    private condition?: Value;
    private thenBasicBlock?: BasicBlock;
    private elseBasicBlock?: BasicBlock;
    constructor(distBasicBlock: BasicBlock)
    constructor(condition: Value, thenBasicBlock: BasicBlock, elseBasicBlock: BasicBlock)
    constructor(...args: any[]) {
        super();
        if (args[0] instanceof BasicBlock) {
            this.distBasicBlock = args[0];
        } else {
            this.condition = args[0];
            this.thenBasicBlock = args[1];
            this.elseBasicBlock = args[2];
        }
    }
    print(): string {
        if (this.condition) return `br ${this.condition}, ${this.thenBasicBlock}, ${this.elseBasicBlock}`;
        return `br ${this.distBasicBlock}`;
    }
}
class BinaryInst extends Instruction {
    constructor(private operation: string, private lhs: Value, private rhs?: Value) {
        super(lhs.getType());
    }
    print(): string {
        if (this.rhs) return `${this.getName()} = ${this.operation} ${this.lhs}, ${this.rhs.toStringNoType()}`;
        return `${this.getName()} = ${this.operation} ${this.lhs}`;
    }
}
export class AddInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('add', lhs, rhs);
    }
}
export class FAddInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('fadd', lhs, rhs);
    }
}
export class SubInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('sub', lhs, rhs);
    }
}
export class FSubInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('fsub', lhs, rhs);
    }
}
export class MulInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('mul', lhs, rhs);
    }
}
export class FMulInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('fmul', lhs, rhs);
    }
}
export class SDivInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('sdiv', lhs, rhs);
    }
}
export class UDivInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('udiv', lhs, rhs);
    }
}
export class FDivInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('fdiv', lhs, rhs);
    }
}
export class SRemInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('srem', lhs, rhs);
    }
}
export class URemInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('urem', lhs, rhs);
    }
}
export class FRemInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('frem', lhs, rhs);
    }
}
export class AndInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('and', lhs, rhs);
    }
}
export class OrInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('or', lhs, rhs);
    }
}
export class XorInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('xor', lhs, rhs);
    }
}
export class ShlInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('shl', lhs, rhs);
    }
}
export class AShrInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('ashr', lhs, rhs);
    }
}
export class LShrInst extends BinaryInst {
    constructor(lhs: Value, rhs: Value) {
        super('lshr', lhs, rhs);
    }
}
export class NegInst extends BinaryInst {
    constructor(lhs: Value) {
        super('neg', lhs);
    }
}
export class FNegInst extends BinaryInst {
    constructor(lhs: Value) {
        super('fneg', lhs);
    }
}
export class NotInst extends BinaryInst {
    constructor(lhs: Value) {
        super('not', lhs);
    }
}
export class AllocaInst extends Instruction {
    constructor(private type: Type, private arraySize?: Value) {
        super(type.getPointerTo());
    }
    print(): string {
        if (this.arraySize) return `${this.getName()} = alloca ${this.type}, ${this.arraySize}`;
        return `${this.getName()} = alloca ${this.type}`;
    }
}
export class LoadInst extends Instruction {
    constructor(private type: Type, private pointer: Value) {
        super(type);
    }
    print(): string {
        return `${this.getName()} = load ${this.type}, ${this.pointer}`;
    }
}
export class StoreInst extends Instruction {
    constructor(private value: Value, private pointer: Value) {
        super();
    }
    print(): string {
        return `store ${this.value}, ${this.pointer}`;
    }
}
export class GEPInst extends Instruction {
    constructor(private type: Type, private pointer: Value, private indexList: Value[]) {
        super(type);
    }
    print(): string {
        return `${this.getName()} = getelementptr ${this.type}, ${this.pointer}, ${this.indexList.join(', ')}`;
    }
}
class ConversionInst extends Instruction {
    constructor(private operation: string, private value: Value, private destType: Type) {
        super(destType);
    }
    print(): string {
        return `${this.getName()} = ${this.operation} ${this.value} to ${this.destType}`;
    }
}
export class TruncInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('trunc', value, destType);
    }
}
export class ZExtInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('zext', value, destType);
    }
}
export class SExtInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('sext', value, destType);
    }
}
export class FPToUIInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('fptoui', value, destType);
    }
}
export class FPToSIInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('fptosi', value, destType);
    }
}
export class UIToFPInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('uitofp', value, destType);
    }
}
export class SIToFPInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('sitofp', value, destType);
    }
}
export class FPTruncInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('fptrunc', value, destType);
    }
}
export class FPExtInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('fpext', value, destType);
    }
}
export class PtrToIntInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('ptrtoint', value, destType);
    }
}
export class IntToPtrInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('inttoptr', value, destType);
    }
}
export class BitCastInst extends ConversionInst {
    constructor(value: Value, destType: Type) {
        super('bitcast', value, destType);
    }
}
export class ICmpInst extends Instruction {
    constructor(private operator: string, private lhs: Value, private rhs: Value) {
        super(Type.getInt1Ty());
    }
    print(): string {
        return `${this.getName()} = icmp ${this.operator} ${this.lhs}, ${this.rhs}`;
    }
}
export class FCmpInst extends Instruction {
    constructor(private operator: string, private lhs: Value, private rhs: Value) {
        super(Type.getInt1Ty());
    }
    print(): string {
        return `${this.getName()} = fcmp ${this.operator} ${this.lhs}, ${this.rhs}`;
    }
}
export type PHIPair = [Value, Value];
export class PHIInst extends Instruction {
    constructor(private type: Type, private pairs: PHIPair[]) {
        super(type);
    }
    print(): string {
        return `${this.getName()} = phi ${this.type} ${this.pairs.map((pair) => {
            return `[${pair[0]}, ${pair[1]}]`;
        }).join(', ')}`;
    }
}
export class CallInst extends Instruction {
    constructor(private callee: Function, private args: Value[]) {
        super(callee.getReturnType());
    }
    print(): string {
        if (this.callee.getType().getReturnType().isVoidTy()) return `call ${this.callee}(${this.args.join(', ')})`;
        return `${this.getName()} = call ${this.callee}(${this.args.join(', ')})`;
    }
}
export class SelectInst extends Instruction {
    constructor(private condition: Value, private trueValue: Value, private falseValue: Value) {
        super(trueValue.getType());
    }
    print(): string {
        return `${this.getName()} = select ${this.condition}, ${this.trueValue}, ${this.falseValue}`;
    }
}
export class CommentInst extends Instruction {
    constructor(private text: string) {
        super(Type.getVoidTy());
    }
    print(): string {
        return `; ${this.text}`;
    }
}