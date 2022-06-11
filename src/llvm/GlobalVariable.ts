import { Constant } from './Constants';
import Type from './Type';
import Value from './Value';

class GlobalVariable extends Value {
    constructor(type: Type, private isConstant: boolean, private linkonce: boolean, private initializer: Constant | null, name?: string) {
        super(type.getPointerTo());
        if (name) {
            this.setName(`@${name}`);
        } else {
            this.setName(`@${Math.floor(Math.random() * 1000000).toString(16)}`);
        }
    }
    print(): string {
        if (this.initializer) {
            return `${this.getName()} = ${this.linkonce ? 'linkonce ': ''}${this.isConstant ? 'constant' : 'global'} ${this.initializer}`;
        } else {
            return `${this.getName()} = ${this.linkonce ? 'linkonce ': ''}${this.isConstant ? 'constant' : 'global'} ${this.getType().getPointerElementType()}`;
        }
    }
}
export default GlobalVariable;