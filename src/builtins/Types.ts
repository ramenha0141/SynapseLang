import * as llvm from '../llvm';

export const boolean = llvm.Type.getInt1Ty();
export const char = llvm.Type.getInt8Ty();
export const short = llvm.Type.getInt16Ty();
export const int = llvm.Type.getInt32Ty();
export const long = llvm.Type.getInt64Ty();
export const half = llvm.Type.getHalfTy();
export const float = llvm.Type.getFloatTy();
export const double = llvm.Type.getDoubleTy();