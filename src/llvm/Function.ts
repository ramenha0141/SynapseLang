import Module from './Module';
import Type, { FunctionType } from './Type';
import Value from './Value';
import Argument from './Argument';
import BasicBlock from './BasicBlock';

class Function extends Value {
    declare protected Ty: FunctionType;
    private args: Argument[];
    private count: number = 0;
    private basicBlocks: BasicBlock[] = [];
    protected constructor(type: FunctionType, name: string, module: Module) {
        super(type);
        this.setName('@' + name);
        module.addFunction(this);
        const paramTypes = type.getParamTypes();
        this.args = paramTypes.map((paramType, i) => {
            return new Argument(paramType, this, this.createIdentifier(), i);
        });
    }
    static Create(funcType: FunctionType, name: string, module: Module): Function {
        return new Function(funcType, name, module);
    }
    public getType(): FunctionType {
        return this.Ty;
    }
    public getArg(i: number): Argument {
        return this.args[i];
    }
    public getReturnType(): Type {
        return this.Ty.getReturnType();
    }
    public addBasicBlock(basicBlock: BasicBlock) {
        this.basicBlocks.push(basicBlock);
    }
    public createIdentifier(label?: boolean): any {
        if (label) return (this.count++).toString();
        return '%' + this.count++;
    }
    public print(): string {
        return `define ${this.Ty.getReturnType()} ${this.name}(${this.args.join(', ')}) {\n${this.basicBlocks.map(basicBlock => basicBlock.print()).join('\n')}\n}`;
    }
}
export default Function;