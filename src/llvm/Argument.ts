import Function from './Function';
import Type from './Type';
import Value from './Value';

class Argument extends Value {
    protected func: Function;
    protected argNo: number;
    constructor(type: Type, func: Function, name: string, argNo: number) {
        super(type);
        this.func = func;
        this.setName(name);
        this.argNo = argNo;
    }
    public getParent(): Function {
        return this.func;
    }
    public getArgNo(): number {
        return this.argNo;
    }
}
export default Argument;