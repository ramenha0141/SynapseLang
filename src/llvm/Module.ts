import Function from './Function';

class Module {
    private moduleID: string;
    private functionList: Function[] = [];
    constructor(moduleID: string) {
        this.moduleID = moduleID;
    }
    public addFunction(func: Function) {
        this.functionList.push(func);
    }
    public print(): string {
        return `source_filename = "${this.moduleID}"\n${this.functionList.map(func => func.print()).join('\n')}`;
    }
}
export default Module;