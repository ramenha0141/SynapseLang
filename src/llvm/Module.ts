import Function from './Function';

class Module {
    constructor(moduleID: string) {
        this.ModuleID = moduleID;
    }
    private ModuleID: string;
    private FunctionList: Function[] = [];
    public getFunctionList(): Function[] {
        return this.FunctionList;
    }
}
export default Module;