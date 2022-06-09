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
    protected constructor(type: FunctionType, name: string, module: Module) {
        super(type);
        this.name = '@' + name;
        module.getFunctionList().push(this);
        const paramTypes = type.paramTypes;
        this.args = paramTypes.map((paramType, i) => {
            return new Argument(paramType, this, this.createIdentifier(), i);
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
    public createIdentifier(label?: boolean): any {
        if (label) return (this.count++).toString();
        return '%' + this.count++;
    }
}
export default Function;