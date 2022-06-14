export enum TypeID {
    HalfTyID,
    BFloatTyID,
    FloatTyID,
    DoubleTyID,
    X86_FP80TyID,
    FP128TyID,
    PPC_FP128TyID,
    VoidTyID,
    LabelTyID,
    MetadataTyID,
    X86_MMXTyID,
    X86_AMXTyID,
    TokenTyID,

    IntegerTyID,
    FunctionTyID,
    PointerTyID,
    StructTyID,
    ArrayTyID,
    FixedVectorTyID,
    ScalableVectorTyID
}
class Type {
    static TypeID = TypeID;

    protected constructor(tid: TypeID) {
        this.ID = tid;
    }
    private ID: TypeID = TypeID.LabelTyID;
    protected SubclassData: number = 0;
    protected getSubclassData() {
        return this.SubclassData;
    }

    public getTypeID(): TypeID {
        return this.ID;
    }
    public getBitWidth() {
        return this.getSubclassData();
    }
    public isVoidTy() {
        return this.ID === TypeID.VoidTyID;
    }
    public isHalfTy() {
        return this.ID === TypeID.HalfTyID;
    }
    public isBFloatTy() {
        return this.ID === TypeID.BFloatTyID;
    }
    public isFloatTy() {
        return this.ID === TypeID.FloatTyID;
    }
    public isDoubleTy() {
        return this.ID === TypeID.DoubleTyID;
    }
    public isX86_FP80Ty() {
        return this.ID === TypeID.X86_FP80TyID;
    }
    public isFP128Ty() {
        return this.ID === TypeID.FP128TyID;
    }
    public isPPC_FP128Ty() {
        return this.ID === TypeID.PPC_FP128TyID;
    }
    public isFloatingPointTy() {
        return this.ID === TypeID.HalfTyID
            || this.ID === TypeID.BFloatTyID
            || this.ID === TypeID.FloatTyID
            || this.ID === TypeID.DoubleTyID
            || this.ID === TypeID.X86_FP80TyID
            || this.ID === TypeID.FP128TyID
            || this.ID === TypeID.PPC_FP128TyID;
    }
    public isX86_MMXTy() {
        return this.ID === TypeID.X86_MMXTyID;
    }
    public isX86_AMXTy() {
        return this.ID === TypeID.X86_AMXTyID;
    }
    public isLabelTy() {
        return this.ID === TypeID.LabelTyID;
    }
    public isMetadataTy() {
        return this.ID === TypeID.MetadataTyID;
    }
    public isTokenTy() {
        return this.ID === TypeID.TokenTyID;
    }
    public isIntegerTy(): boolean
    public isIntegerTy(bitWidth: number): boolean
    public isIntegerTy(bitWidth?: number) {
        if (bitWidth) {
            return this.ID === TypeID.IntegerTyID && this.getBitWidth() === bitWidth;
        } else {
            return this.ID === TypeID.IntegerTyID;
        }
    }
    public isFunctionTy() {
        return this.ID === TypeID.FunctionTyID;
    }
    public isStructTy() {
        return this.ID === TypeID.StructTyID;
    }
    public isArrayTy() {
        return this.ID === TypeID.ArrayTyID;
    }
    public isPointerTy(): this is PointerType {
        return this.ID === TypeID.PointerTyID;
    }
    public isVectorTy() {
        return this.ID === TypeID.ScalableVectorTyID
            || this.ID === TypeID.FixedVectorTyID;
    }
    public getPrimitiveSizeInBits(): number {
        switch (this.getTypeID()) {
            case TypeID.HalfTyID: return 16;
            case TypeID.BFloatTyID: return 16;
            case TypeID.FloatTyID: return 32;
            case TypeID.DoubleTyID: return 64;
            case TypeID.X86_FP80TyID: return 80;
            case TypeID.FP128TyID: return 128;
            case TypeID.PPC_FP128TyID: return 128;
            case TypeID.X86_MMXTyID: return 128;
            case TypeID.X86_AMXTyID: return 8192;
            case TypeID.IntegerTyID: return this.getBitWidth();
            default: return 0;
        }
    }
    public getPointerTo() {
        return PointerType.get(this);
    }
    public getPointerElementType(): Type {
        if (!this.isPointerTy()) throw new Error();
        return this.getElementType();
    }

    public toString(): string {
        switch (this.ID) {
            case TypeID.HalfTyID: return 'half';
            case TypeID.BFloatTyID: return 'bfloat';
            case TypeID.FloatTyID: return 'float';
            case TypeID.DoubleTyID: return 'double';
            case TypeID.X86_FP80TyID: return 'x86_fp80';
            case TypeID.FP128TyID: return 'fp128';
            case TypeID.PPC_FP128TyID: return 'ppc_fp128';
            case TypeID.VoidTyID: return 'void';
            case TypeID.LabelTyID: return 'label';
            case TypeID.MetadataTyID: return 'metadata';
            case TypeID.X86_MMXTyID: return 'x86_mmx';
            case TypeID.X86_AMXTyID: return 'x86_amx';
            case TypeID.TokenTyID: return 'token';
            case TypeID.IntegerTyID: return `i${this.getBitWidth()}`;
            default: throw new Error();
        }
    }

    static getPrimitiveType(ID: TypeID): Type {
        switch (ID) {
            case TypeID.VoidTyID: return this.getVoidTy();
            case TypeID.HalfTyID: return this.getHalfTy();
            case TypeID.BFloatTyID: return this.getBFloatTy();
            case TypeID.FloatTyID: return this.getFloatTy();
            case TypeID.DoubleTyID: return this.getDoubleTy();
            case TypeID.X86_FP80TyID: return this.getX86_FP80Ty();
            case TypeID.FP128TyID: return this.getFP128Ty();
            case TypeID.PPC_FP128TyID: return this.getPPC_FP128Ty();
            case TypeID.LabelTyID: return this.getLabelTy();
            case TypeID.MetadataTyID: return this.getMetadataTy();
            case TypeID.X86_MMXTyID: return this.getX86_MMXTy();
            case TypeID.X86_AMXTyID: return this.getX86_AMXTy();
            case TypeID.TokenTyID: return this.getTokenTy();
            default: throw new Error();
        }
    }
    static getVoidTy() {
        return new Type(TypeID.VoidTyID);
    }
    static getHalfTy() {
        return new Type(TypeID.HalfTyID);
    }
    static getBFloatTy() {
        return new Type(TypeID.BFloatTyID);
    }
    static getFloatTy() {
        return new Type(TypeID.FloatTyID);
    }
    static getDoubleTy() {
        return new Type(TypeID.DoubleTyID);
    }
    static getX86_FP80Ty() {
        return new Type(TypeID.X86_FP80TyID);
    }
    static getFP128Ty() {
        return new Type(TypeID.FP128TyID);
    }
    static getPPC_FP128Ty() {
        return new Type(TypeID.PPC_FP128TyID);
    }
    static getLabelTy() {
        return new Type(TypeID.LabelTyID);
    }
    static getMetadataTy() {
        return new Type(TypeID.MetadataTyID);
    }
    static getX86_MMXTy() {
        return new Type(TypeID.X86_MMXTyID);
    }
    static getX86_AMXTy() {
        return new Type(TypeID.X86_AMXTyID);
    }
    static getTokenTy() {
        return new Type(TypeID.TokenTyID);
    }
    static getInt1Ty() {
        return IntegerType.get(1);
    }
    static getInt8Ty() {
        return IntegerType.get(8);
    }
    static getInt16Ty() {
        return IntegerType.get(16);
    }
    static getInt32Ty() {
        return IntegerType.get(32);
    }
    static getInt64Ty() {
        return IntegerType.get(64);
    }
    static getInt128Ty() {
        return IntegerType.get(128);
    }
    static getIntNTy(numBits: number) {
        return IntegerType.get(numBits);
    }
}
export default Type;
export class IntegerType extends Type {
    protected constructor(numBits: number) {
        super(TypeID.IntegerTyID);
        this.SubclassData = numBits;
    }
    static get(numBits: number): IntegerType {
        return new IntegerType(numBits);
    }
}
export class FunctionType extends Type {
    private returnType: Type;
    private paramTypes: Type[];
    private isVarArg: boolean;
    protected constructor(returnType: Type, paramTypes: Type[], isVarArg: boolean) {
        super(TypeID.FunctionTyID);
        this.returnType = returnType;
        this.paramTypes = paramTypes;
        this. isVarArg = isVarArg;
    }
    public static get(returnType: Type, paramTypes: Type[], isVarArg: boolean): FunctionType {
        return new FunctionType(returnType, paramTypes, isVarArg);
    }
    public getReturnType() {
        return this.returnType;
    }
    public getParamTypes() {
        return this.paramTypes;
    }
    public getIsVarArg() {
        return this.isVarArg;
    }
    public toString(): string {
        if (this.isVarArg) {
            return `${this.returnType} (${this.paramTypes.join(', ')}, ...)`;
        } else {
            return this.returnType.toString();
        }
    }
}
export class PointerType extends Type {
    private pointeeTy: Type;
    protected constructor(elementType: Type) {
        super(TypeID.PointerTyID);
        this.pointeeTy = elementType;
    }
    static get(elementType: Type): PointerType {
        return new PointerType(elementType);
    }
    public getElementType(): Type {
        return this.pointeeTy;
    }
    public toString(): string {
        return `${this.pointeeTy}*`;
    }
}
export class ArrayType extends Type {
    protected constructor(private elementType: Type, private numberOfElements: number) {
        super(TypeID.ArrayTyID);
    }
    static get(elementType: Type, numberOfElements: number): ArrayType {
        return new ArrayType(elementType, numberOfElements);
    }
    public getElementType(): Type {
        return this.elementType;
    }
    public getNumberOfElements(): number {
        return this.numberOfElements;
    }
    public toString(): string {
        return `[${this.numberOfElements} x ${this.elementType}]`;
    }
}