import crypto from 'crypto';
import BasicBlock from './BasicBlock';
import Instruction, * as Instructions from './Instructions';
import type { PHIPair } from './Instructions';
import Type from './Type';
import Value from './Value';
import Function from './Function';
import GlobalVariable from './GlobalVariable';
import { ConstantString } from './Constants';

const hash = crypto.createHash('sha256');
class IRBuilder {
    private basicBlock?: BasicBlock;
    constructor(basicBlock?: BasicBlock) {
        if (basicBlock) this.basicBlock = basicBlock;
    }
    public SetInsertPoint(basicBlock: BasicBlock) {
        this.basicBlock = basicBlock;
    }
    private insert(instruction: Instruction) {
        if (!this.basicBlock) throw new Error();
        this.basicBlock.addInstruction(instruction)
    }
    private setName(instruction: Instruction) {
        if (!this.basicBlock) throw new Error();
        instruction.setName(this.basicBlock.getParent().createIdentifier());
    }
    CreateGlobalString(str: string, name?: string): GlobalVariable {
        if (!name) {
            hash.update(str);
            name = `"${hash.digest('base64')}"`;
        }
        const string = ConstantString.get(str);
        const variable =  new GlobalVariable(string.getType(), true, true, ConstantString.get(str), name);
        llvmModule.addGlobalVariable(variable);
        return variable;
    }
    CreateRetVoid() {
        this.insert(new Instructions.RetInst());
    }
    CreateRet(value: Value) {
        this.insert(new Instructions.RetInst(value));
    }
    CreateBr(basicBlock: BasicBlock) {
        this.insert(new Instructions.BrInst(basicBlock));
    }
    CreateCondBr(condition: Value, thenBasicBlock: BasicBlock, elseBasicBlock: BasicBlock) {
        this.insert(new Instructions.BrInst(condition, thenBasicBlock, elseBasicBlock));
    }
    CreateAdd(lhs: Value, rhs: Value) {
        const instruction = new Instructions.AddInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFAdd(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FAddInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateSub(lhs: Value, rhs: Value) {
        const instruction = new Instructions.SubInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFSub(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FSubInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateMul(lhs: Value, rhs: Value) {
        const instruction = new Instructions.MulInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFMul(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FMulInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateSDiv(lhs: Value, rhs: Value) {
        const instruction = new Instructions.SDivInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateUDiv(lhs: Value, rhs: Value) {
        const instruction = new Instructions.UDivInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFDiv(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FDivInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateSRem(lhs: Value, rhs: Value) {
        const instruction = new Instructions.SRemInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateURem(lhs: Value, rhs: Value) {
        const instruction = new Instructions.URemInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFRem(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FRemInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateAnd(lhs: Value, rhs: Value) {
        const instruction = new Instructions.AndInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateOr(lhs: Value, rhs: Value) {
        const instruction = new Instructions.OrInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateXor(lhs: Value, rhs: Value) {
        const instruction = new Instructions.XorInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateShl(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ShlInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateAShr(lhs: Value, rhs: Value) {
        const instruction = new Instructions.AShrInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateLShr(lhs: Value, rhs: Value) {
        const instruction = new Instructions.LShrInst(lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateNeg(value: Value) {
        const instruction = new Instructions.NegInst(value);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFNeg(value: Value) {
        const instruction = new Instructions.FNegInst(value);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateNot(value: Value) {
        const instruction = new Instructions.NotInst(value);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateAlloca(type: Type, arraySize?: Value) {
        const instruction = new Instructions.AllocaInst(type, arraySize);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateLoad(type: Type, pointer: Value) {
        const instruction = new Instructions.LoadInst(type, pointer);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateStore(value: Value, pointer: Value) {
        this.insert(new Instructions.StoreInst(value, pointer));
    }
    CreateGEP(type: Type, pointer: Value, indexList: Value[]) {
        const instruction = new Instructions.GEPInst(type, pointer, indexList);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateTrunc(value: Value, destType: Type) {
        const instruction = new Instructions.TruncInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateZExt(value: Value, destType: Type) {
        const instruction = new Instructions.ZExtInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateSExt(value: Value, destType: Type) {
        const instruction = new Instructions.SExtInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFPToUI(value: Value, destType: Type) {
        const instruction = new Instructions.FPToUIInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFPToSI(value: Value, destType: Type) {
        const instruction = new Instructions.FPToSIInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateUIToFP(value: Value, destType: Type) {
        const instruction = new Instructions.UIToFPInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateSIToFP(value: Value, destType: Type) {
        const instruction = new Instructions.SIToFPInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFPTrunc(value: Value, destType: Type) {
        const instruction = new Instructions.FPTruncInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFPExt(value: Value, destType: Type) {
        const instruction = new Instructions.FPExtInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreatePtrToInt(value: Value, destType: Type) {
        const instruction = new Instructions.PtrToIntInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateIntToPtr(value: Value, destType: Type) {
        const instruction = new Instructions.IntToPtrInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateBitCast(value: Value, destType: Type) {
        const instruction = new Instructions.BitCastInst(value, destType);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpEQ(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('eq', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpNE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('ne', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpSGE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('sge', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpSGT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('sgt', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpSLE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('sle', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpSLT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('slt', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpUGE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('uge', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpUGT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('ugt', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpULE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('ule', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateICmpULT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.ICmpInst('ult', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpOEQ(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('oeq', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpONE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('one', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpOGE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('oge', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpOGT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('ogt', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpOLE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('ole', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpOLT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('olt', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpUEQ(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('ueq', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpUNE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('une', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpUGE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('uge', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpUGT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('ugt', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpULE(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('ule', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateFCmpULT(lhs: Value, rhs: Value) {
        const instruction = new Instructions.FCmpInst('ult', lhs, rhs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreatePHI(type: Type, pairs: PHIPair[]) {
        const instruction = new Instructions.PHIInst(type, pairs);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateCall(callee: Function, args: Value[]) {
        const instruction = new Instructions.CallInst(callee, args);
        if (!callee.getType().getReturnType().isVoidTy()) this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateSelect(condition: Value, trueValue: Value, falseValue: Value) {
        const instruction = new Instructions.SelectInst(condition, trueValue, falseValue);
        this.setName(instruction);
        this.insert(instruction);
        return instruction;
    }
    CreateComment(text: string) {
        this.insert(new Instructions.CommentInst(text));
    }
}
export default IRBuilder;