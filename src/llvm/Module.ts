import Function from './Function';
import GlobalVariable from './GlobalVariable';

class Module {
    private moduleID: string;
    private globalVariableList: GlobalVariable[] = [];
    private functionList: Function[] = [];
    constructor(moduleID: string) {
        this.moduleID = moduleID;
    }
    public addGlobalVariable(globalVariable: GlobalVariable) {
        this.globalVariableList.push(globalVariable);
    }
    public addFunction(func: Function) {
        this.functionList.push(func);
    }
    public print(): string {
        return `source_filename = "${this.moduleID}"\n${this.globalVariableList.map(globalVariable => globalVariable.print()).join('\n')}\n${this.functionList.map(func => func.print()).join('\n')}`;
    }
}
export default Module;