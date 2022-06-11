import type { Module, IRBuilder } from '../llvm';
declare global {
    var dev: boolean;
    var llvmModule: Module;
    var builder: IRBuilder;
}