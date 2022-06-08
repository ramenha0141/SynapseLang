import Function from './Function';
import Instruction from './Instructions';
import Type from './Type';
import Value from './Value';

class BasicBlock extends Value {
    private parent: Function;
    protected constructor(parent: Function, name?: string) {
        super(Type.getLabelTy());
        this.parent = parent;
        this.setName(name || parent.createIdentifier(true));
    }
    private instructions: Instruction[] = [];
    public addInstruction(instruction: Instruction) {
        this.instructions.push(instruction);
    }
    public getParent() {
        return this.parent;
    }
}
export default BasicBlock;