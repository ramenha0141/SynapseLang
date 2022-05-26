class Module {
    constructor(MID: string) {
        this.ModuleID = this.SourceFileName = MID;
    }
    private ModuleID: string;
    private SourceFileName: string;
}
export default Module;