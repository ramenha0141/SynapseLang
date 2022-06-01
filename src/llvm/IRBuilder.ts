import BasicBlock from './BasicBlock';

class IRBuilder {
    protected BB?: BasicBlock;
    constructor()
    constructor(BB: BasicBlock)
    constructor(BB?: BasicBlock) {
        if (BB) this.BB = BB;
    }
}
export default IRBuilder;