import BasicBlock from './BasicBlock';

class IRBuilder {
    protected basicBlock?: BasicBlock;
    constructor(basicBlock?: BasicBlock) {
        if (basicBlock) this.basicBlock = basicBlock;
    }
    public setInsertPoint(basicBlock: BasicBlock) {
        this.basicBlock = basicBlock;
    }
}
export default IRBuilder;