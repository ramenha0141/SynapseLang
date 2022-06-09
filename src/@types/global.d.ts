import type { Module, IRBuilder } from '../llvm';
declare global {
    var llvmModule: Module;
    var builder: IRBuilder;
}