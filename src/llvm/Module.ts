import Function from './Function';
import GlobalVariable from './GlobalVariable';
import { StructType } from './Type';

class Module {
    private moduleID: string;
    private structList: StructType[] = [];
    private globalVariableList: GlobalVariable[] = [];
    private functionList: Function[] = [];
    constructor(moduleID: string) {
        this.moduleID = moduleID;
    }
    public addStruct(struct: StructType) {
        this.structList.push(struct);
    }
    public addGlobalVariable(globalVariable: GlobalVariable) {
        this.globalVariableList.push(globalVariable);
    }
    public addFunction(func: Function) {
        this.functionList.push(func);
    }
    public print(): string {
        return `source_filename = "${this.moduleID}"
${this.structList.map(struct => struct.print()).join('\n')}
${this.globalVariableList.map(globalVariable => globalVariable.print()).join('\n')}
${this.functionList.map(func => func.print()).join('\n')}`;
    }
}
export default Module;