import llvm from 'llvm-bindings';
import Scope, { Symbols } from './Scope';
import condition from './Condition';

//@ts-expect-error
export const Expression = (context: ExpressionContext, scope: Scope, expectedType?: llvm.Type): llvm.Value => {
    switch (context.type) {
        
    }
};