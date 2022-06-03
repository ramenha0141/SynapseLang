import BasicBlock from './BasicBlock';
import Type from './Type';
import Value from './Value';

class Instruction extends Value {
    constructor(type?: Type) {
        super(type ?? Type.getVoidTy());
    }
}
export default Instruction;
export class RetInst extends Instruction {
    constructor(private value?: Value) {
        super();
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
        if (args[0] instanceof Value) {
            this.condition = args[0];
            this.thenBasicBlock = args[1];
            this.elseBasicBlock = args[2];
        } else {
            this.distBasicBlock = args[0];
        }
    }
}
class BinaryInst extends Instruction {
    constructor(private type: string, private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class AddInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class FAddInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class SubInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class FSubInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class MulInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class FMulInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class SDivInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class UDivInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class FDivInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class SRemInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class URemInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class FRemInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class AndInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class OrInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}
export class XorInst extends Instruction {
    constructor(private lhs: Value, private rhs: Value) {
        super(lhs.getType());
    }
}