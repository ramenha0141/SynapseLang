import Function from './Function';

class Module {
    private moduleID: string;
    private functionList: Function[] = [];
    constructor(moduleID: string) {
        this.moduleID = moduleID;
    }
    public getFunctionList(): Function[] {
        return this.functionList;
    }
}
export default Module;