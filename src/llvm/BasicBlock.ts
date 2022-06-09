import Function from './Function';
import Instruction from './Instructions';
import Type from './Type';
import Value from './Value';

class BasicBlock extends Value {
    private parent: Function;
    private instructions: Instruction[] = [];
    protected constructor(parent: Function, name?: string) {
        super(Type.getLabelTy());
        this.parent = parent;
        this.setName(name || parent.createIdentifier(true));
        parent.addBasicBlock(this);
    }
    static Create(parent: Function, name?: string) {
        return new BasicBlock(parent, name);
    }
    public addInstruction(instruction: Instruction) {
        this.instructions.push(instruction);
    }
    public getParent() {
        return this.parent;
    }
    public print(): string {
        return `${this.name}:\n${this.instructions.map(instruction => `    ${instruction.print()}`)}`;
    }
}
export default BasicBlock;