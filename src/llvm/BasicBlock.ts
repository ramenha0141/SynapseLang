import Function from './Function';
import Instruction from './Instructions';
import Type from './Type';
import Value from './Value';

class BasicBlock extends Value {
    private parent?: Function;
    private instructions: Instruction[] = [];
    protected constructor(parent?: Function) {
        super(Type.getLabelTy());
        if (parent) {
            this.parent = parent;
            this.setName(parent.createIdentifier());
            parent.addBasicBlock(this);
        }
    }
    static Create(): BasicBlock
    static Create(parent: Function): BasicBlock
    static Create(parent?: Function): BasicBlock {
        return new BasicBlock(parent);
    }
    public insertTo(parent: Function) {
        this.parent = parent;
        this.setName(parent.createIdentifier());
        parent.addBasicBlock(this);
    }
    public addInstruction(instruction: Instruction) {
        this.instructions.push(instruction);
    }
    public getParent() {
        return this.parent;
    }
    public print(): string {
        return `${this.name.slice(1)}:\n${this.instructions.map(instruction => `    ${instruction.print()}`).join('\n')}`;
    }
}
export default BasicBlock;