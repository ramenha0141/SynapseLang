import { Type } from 'llvm-bindings';
declare module 'llvm-bindings' {
    interface Type {
        isNullable?: boolean
    }
}