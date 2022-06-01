import Function from './Function';
import Instruction from './Instructions';
import Type from './Type';
import Value from './Value';

class BasicBlock extends Value {
    protected constructor(name?: string, parent: Function) {
        super(Type.getLabelTy());
        this.setName(name || '%' + parent.);

    }
    private instructions: Instruction[] = [];
}
export default BasicBlock;