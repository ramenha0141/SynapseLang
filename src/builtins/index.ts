import * as llvm from '../llvm';
import * as Types from './Types';
import console from './console';

const builtins = (llvmModule: llvm.Module) => {
    return {
        ...Types,
        console: console(llvmModule)
    };
};
export default builtins;