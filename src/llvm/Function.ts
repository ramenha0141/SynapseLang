import Module from './Module';
import Type, { FunctionType } from './Type';
import Value from './Value';
import Argument from './Argument';
import BasicBlock from './BasicBlock';

class Function extends Value {
    protected name: string;
    private args: Argument[];
    private count: number = 0;
    private basicBlocks: BasicBlock[] = [];
    protected constructor(Ty: FunctionType, name: string, M: Module) {
        super(Ty);
        this.name = '@' + name;
        M.getFunctionList().push(this);
        const paramTypes = Ty.paramTypes;
        this.args = paramTypes.map((paramType, i) => {
            return new Argument(paramType, this, '%' + this.count++, i);
        });
    }
    static Create(funcType: FunctionType, name: string, module: Module): Function {
        return new Function(funcType, name, module);
    }
    public getArg(i: number): Argument {
        return this.args[i];
    }
    public getReturnType(): Type {
        return (this.getType() as FunctionType).returnType;
    }
    public addBasicBlock(basicBlock: BasicBlock) {
        this.basicBlocks.push(basicBlock);
    }
}
export default Function;