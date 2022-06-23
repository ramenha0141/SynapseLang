import Class from '../common/Class';
import type * as llvm from '../llvm';
declare global {
    var dev: boolean;
    var llvmModule: llvm.Module;
    var builder: llvm.IRBuilder;
    var classMap: Map<llvm.StructType, Class>
}