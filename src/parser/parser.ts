import { alt, apply, kleft, kmid, kright, list_sc, lrec_sc, opt, rep_sc, rule, seq, tok } from 'typescript-parsec';
import TokenKind from './TokenKind.js';
const Module = rule<TokenKind, ModuleContext>();
const ImportDeclaration = rule<TokenKind, ImportDeclarationContext>();
const ImportDefineDeclaration = rule<TokenKind, ImportDefineDeclarationContext>();
const ImportNamespaceDeclaration = rule<TokenKind, ImportNamespaceDeclarationContext>();
const ImportBuiltinDeclaration = rule<TokenKind, ImportBuiltinDeclarationContext>();
const Declaration = rule<TokenKind, DeclarationContext>();
const FunctionDeclaration = rule<TokenKind, FunctionDeclarationContext>();
const DeclareDeclaration = rule<TokenKind, DeclareDeclarationContext>();
const VariableDeclaration = rule<TokenKind, VariableDeclarationContext>();
const ClassDeclaration = rule<TokenKind, ClassDeclarationContext>();
const ClassConstructor = rule<TokenKind, ClassConstructorContext>();
const ClassField = rule<TokenKind, ClassFieldContext>();
const ClassMethod = rule<TokenKind, ClassMethodContext>();
const Statement = rule<TokenKind, StatementContext>();
const BlockStatement = rule<TokenKind, BlockStatementContext>();
const ExpressionStatement = rule<TokenKind, ExpressionStatementContext>();
const ReturnStatement = rule<TokenKind, ReturnStatementContext>();
const IfStatement = rule<TokenKind, IfStatementContext>();
const WhileStatement = rule<TokenKind, WhileStatementContext>();
const ForStatement = rule<TokenKind, ForStatementContext>();
const ForNormalStatement = rule<TokenKind, ForNormalStatementContext>();
const ForInStatement = rule<TokenKind, ForInStatementContext>();
const BreakStatement = rule<TokenKind, BreakStatementContext>();
const ContinueStatement = rule<TokenKind, ContinueStatementContext>();
const Expression = rule<TokenKind, ExpressionContext>();
const AssignmentExpression = rule<TokenKind, ExpressionContext>();
const TernaryExpression = rule<TokenKind, ExpressionContext>();
const LogicalOrExpression = rule<TokenKind, ExpressionContext>();
const LogicalAndExpression = rule<TokenKind, ExpressionContext>();
const BitOrExpression = rule<TokenKind, ExpressionContext>();
const BitXOrExpression = rule<TokenKind, ExpressionContext>();
const BitAndExpression = rule<TokenKind, ExpressionContext>();
const EqualityExpression = rule<TokenKind, ExpressionContext>();
const RelationalExpression = rule<TokenKind, ExpressionContext>();
const BitShiftExpression = rule<TokenKind, ExpressionContext>();
const AdditiveExpression = rule<TokenKind, ExpressionContext>();
const MultiplicativeExpression = rule<TokenKind, ExpressionContext>();
const AssertionExpression = rule<TokenKind, ExpressionContext>();
const UnaryExpression = rule<TokenKind, ExpressionContext>();
const UnaryPlusExpression = rule<TokenKind, UnaryPlusExpressionContext>();
const UnaryMinusExpression = rule<TokenKind, UnaryMinusExpressionContext>();
const BitNotExpression = rule<TokenKind, BitNotExpressionContext>();
const NotExpression = rule<TokenKind, NotExpressionContext>();
const NewExpression = rule<TokenKind, NewExpressionContext>();
const DeleteExpression = rule<TokenKind, DeleteExpressionContext>();
const SizeofExpression = rule<TokenKind, SizeofExpressionContext>();
const UpdateExpression = rule<TokenKind, ExpressionContext>();
const PostIncrementExpression = rule<TokenKind, ExpressionContext>();
const PostDecrementExpression = rule<TokenKind, ExpressionContext>();
const PreIncrementExpression = rule<TokenKind, ExpressionContext>();
const PreDecrementExpression = rule<TokenKind, ExpressionContext>();
const PostfixExpression = rule<TokenKind, ExpressionContext>();
const IndexExpression = rule<TokenKind, IndexExpressionPostfixPart>();
const MemberExpression = rule<TokenKind, MemberExpressionPostfixPart>();
const CallExpression = rule<TokenKind, CallExpressionPostfixPart>();
const PrimaryExpression = rule<TokenKind, ExpressionContext>();
const ThisExpression = rule<TokenKind, ThisExpressionContext>();
const SuperExpression = rule<TokenKind, SuperExpressionContext>()
const Literal = rule<TokenKind, LiteralContext>();;
const ParenthesizedExpression = rule<TokenKind, ExpressionContext>();
const NullLiteral = rule<TokenKind, NullLiteralContext>();
const BooleanLiteral = rule<TokenKind, BooleanLiteralContext>();
const StringLiteral = rule<TokenKind, StringLiteralContext>();
const NumberLiteral = rule<TokenKind, NumberLiteralContext>();
const ArrayLiteral = rule<TokenKind, ArrayLiteralContext>();
const Parameter = rule<TokenKind, ParameterContext>();
const ParameterList = rule<TokenKind, ParameterContext[]>();
const Arguments = rule<TokenKind, ArgumentsContext>();
const Type = rule<TokenKind, TypeContext>();
const TypeAnnotation = rule<TokenKind, TypeContext>();
const Identifier = rule<TokenKind, IdentifierContext>();
const eos = tok(TokenKind.SemiColon);
Module.setPattern(
    apply(
        seq(
            rep_sc(ImportDeclaration),
            rep_sc(Declaration)
        ),
        (value, [token]) => ({
            type: 'Module',
            importDeclarations: value[0],
            declarations: value[1],
            position: token!.pos
        })
    )
);
ImportDeclaration.setPattern(
    alt(ImportDefineDeclaration, ImportNamespaceDeclaration, ImportBuiltinDeclaration)
);
ImportDefineDeclaration.setPattern(
    apply(
        seq(
            kmid(
                tok(TokenKind.Import),
                kmid(
                    tok(TokenKind.OpenBrace),
                    list_sc(
                        tok(TokenKind.Identifier),
                        tok(TokenKind.Comma)
                    ),
                    tok(TokenKind.CloseBrace)
                ),
                tok(TokenKind.From)
            ),
            kleft(
                tok(TokenKind.StringLiteral),
                eos
            )
        ),
        (value, [token]) => ({
            type: 'ImportDefineDeclaration',
            defines: value[0].map(e => e.text),
            path: value[1].text.slice(1, -1),
            position: token!.pos
        }))
);
ImportNamespaceDeclaration.setPattern(
    apply(
        seq(
            kmid(
                tok(TokenKind.Import),
                tok(TokenKind.Identifier),
                tok(TokenKind.From)
            ),
            kleft(
                tok(TokenKind.StringLiteral),
                eos
            )
        ),
        (value, [token]) => ({
            type: 'ImportNamespaceDeclaration',
            identifier: value[0].text,
            path: value[1].text.slice(1, -1),
            position: token!.pos
        })
    )
);
ImportBuiltinDeclaration.setPattern(
    apply(
        kmid(
            tok(TokenKind.Import),
            tok(TokenKind.Identifier),
            eos
        ),
        (value, [token]) => ({
            type: 'ImportBuiltinDeclaration',
            identifier: value.text,
            position: token!.pos
        })
    )
);
Declaration.setPattern(
    alt(FunctionDeclaration, DeclareDeclaration, VariableDeclaration, ClassDeclaration)
);
FunctionDeclaration.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.Function),
                tok(TokenKind.Identifier)
            ),
            kmid(
                tok(TokenKind.OpenParen),
                ParameterList,
                tok(TokenKind.CloseParen)
            ),
            opt(
                TypeAnnotation
            ),
            BlockStatement
        ),
        (value, [token]) => ({
            type: 'FunctionDeclaration',
            identifier: value[0].text,
            parameterList: value[1],
            typeAnnotation: value[2],
            body: value[3],
            position: token!.pos
        })
    )
);
DeclareDeclaration.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.Declare),
                list_sc(
                    tok(TokenKind.Identifier),
                    tok(TokenKind.Comma)
                ),
            ),
            opt(
                kright(
                    tok(TokenKind.As),
                    tok(TokenKind.Identifier)
                )
            ),
            kmid(
                tok(TokenKind.OpenParen),
                ParameterList,
                tok(TokenKind.CloseParen)
            ),
            TypeAnnotation
        ),
        (value, [token]) => ({
            type: 'DeclareDeclaration',
            identifier: value[0].join('.'),
            alias: value[1]?.text,
            parameters: value[2],
            typeAnnotation: value[3],
            position: token!.pos
        })
    )
);
VariableDeclaration.setPattern(
    apply(
        seq(
            alt(
                tok(TokenKind.Let),
                tok(TokenKind.Const)
            ),
            tok(TokenKind.Identifier),
            opt(
                TypeAnnotation
            ),
            kleft(
                opt(
                    kright(
                        tok(TokenKind.Assign),
                        Expression
                    )
                ),
                eos
            )
        ),
        (value, [token]) => ({
            type: 'VariableDeclaration',
            isConstant: value[0].kind === TokenKind.Const,
            identifier: value[1].text,
            typeAnnotation: value[2],
            expression: value[3],
            position: token!.pos
        })
    )
);
ClassDeclaration.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.Class),
                tok(TokenKind.Identifier)
            ),
            opt(
                kright(
                    tok(TokenKind.Extends),
                    Identifier
                )
            ),
            kmid(
                tok(TokenKind.OpenBrace),
                rep_sc(
                    alt(
                        ClassConstructor,
                        ClassField,
                        ClassMethod
                    )
                ),
                tok(TokenKind.CloseBrace)
            )
        ),
        (value, [token]) => ({
            type: 'ClassDeclaration',
            identifier: value[0].text,
            extends: value[1],
            constructor: value[2].filter((e): e is ClassConstructorContext => e.type === 'ClassConstructor')[0],
            fields: value[2].filter((e): e is ClassFieldContext => e.type === 'ClassField'),
            methods: value[2].filter((e): e is ClassMethodContext => e.type === 'ClassMethod'),
            position: token!.pos
        })
    )
);
ClassConstructor.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.Constructor),
                kmid(
                    tok(TokenKind.OpenParen),
                    ParameterList,
                    tok(TokenKind.CloseParen)
                )
            ),
            BlockStatement
        ),
        (value, [token]) => ({
            type: 'ClassConstructor',
            parameterList: value[0],
            body: value[1],
            position: token!.pos
        })
    )
);
ClassField.setPattern(
    apply(
        seq(
            tok(TokenKind.Identifier),
            kleft(
                TypeAnnotation,
                eos
            )
        ),
        (value, [token]) => ({
            type: 'ClassField',
            identifier: value[0].text,
            typeAnnotation: value[1],
            position: token!.pos
        })
    )
);
ClassMethod.setPattern(
    apply(
        seq(
            tok(TokenKind.Identifier),
            kmid(
                tok(TokenKind.OpenParen),
                ParameterList,
                tok(TokenKind.CloseParen)
            ),
            opt(
                TypeAnnotation
            ),
            BlockStatement
        ),
        (value, [token]) => ({
            type: 'ClassMethod',
            identifier: value[0].text,
            parameterList: value[1],
            typeAnnotation: value[3] && value[2],
            body: value[3] ?? value[2],
            position: token!.pos
        })
    )
);
Statement.setPattern(
    alt(
        BlockStatement,
        VariableDeclaration,
        ExpressionStatement,
        ReturnStatement,
        IfStatement,
        WhileStatement,
        ForStatement,
        BreakStatement,
        ContinueStatement
    )
);
BlockStatement.setPattern(
    apply(
        kmid(
            tok(TokenKind.OpenBrace),
            rep_sc(
                Statement
            ),
            tok(TokenKind.CloseBrace)
        ),
        (value, [token]) => ({
            type: 'BlockStatement',
            statements: value,
            position: token!.pos
        })
    )
);
ExpressionStatement.setPattern(
    apply(
        kleft(
            Expression,
            eos
        ),
        (value, [token]) => ({
            type: 'ExpressionStatement',
            expression: value,
            position: token!.pos
        })
    )
);
ReturnStatement.setPattern(
    apply(
        kmid(
            tok(TokenKind.Return),
            opt(
                Expression
            ),
            eos
        ),
        (value, [token]) => ({
            type: 'ReturnStatement',
            expression: value,
            position: token!.pos
        })
    )
);
IfStatement.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.If),
                kmid(
                    tok(TokenKind.OpenParen),
                    Expression,
                    tok(TokenKind.CloseParen)
                )
            ),
            Statement,
            opt(
                kright(
                    tok(TokenKind.Else),
                    Statement
                )
            )
        ),
        (value, [token]) => ({
            type: 'IfStatement',
            condition: value[0],
            then: value[1],
            else: value[2],
            position: token!.pos
        })
    )
);
WhileStatement.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.While),
                kmid(
                    tok(TokenKind.OpenParen),
                    Expression,
                    tok(TokenKind.CloseParen)
                )
            ),
            Statement
        ),
        (value, [token]) => ({
            type: 'WhileStatement',
            condition: value[0],
            then: value[1],
            position: token!.pos
        })
    )
);
ForStatement.setPattern(
    alt(
        ForNormalStatement,
        ForInStatement
    )
);
ForNormalStatement.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.For),
                kmid(
                    tok(TokenKind.OpenParen),
                    seq(
                        VariableDeclaration,
                        kleft(
                            Expression,
                            eos
                        ),
                        Expression
                    ),
                    tok(TokenKind.CloseParen)
                )
            ),
            Statement
        ),
        (value, [token]) => ({
            type: 'ForNormalStatement',
            initialization: value[0][0],
            condition: value[0][1],
            final: value[0][2],
            then: value[1],
            position: token!.pos
        })
    )
);
ForInStatement.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.For),
                kmid(
                    tok(TokenKind.OpenParen),
                    seq(
                        kleft(
                            tok(TokenKind.Identifier),
                            tok(TokenKind.In)
                        ),
                        Expression
                    ),
                    tok(TokenKind.CloseParen)
                )
            ),
            Statement
        ),
        (value, [token]) => ({
            type: 'ForInStatement',
            identifier: value[0][0].text,
            expression: value[0][1],
            then: value[1],
            position: token!.pos
        })
    )
);
BreakStatement.setPattern(
    apply(
        seq(
            tok(TokenKind.Break),
            eos
        ),
        (value, [token]) => ({
            type: 'BreakStatement',
            position: token!.pos
        })
    )
);
ContinueStatement.setPattern(
    apply(
        seq(
            tok(TokenKind.Continue),
            eos
        ),
        (value, [token]) => ({
            type: 'ContinueStatement',
            position: token!.pos
        })
    )
);
Expression.setPattern(
    AssignmentExpression
);
AssignmentExpression.setPattern(
    apply(
        seq(
            TernaryExpression,
            opt(
                seq(
                    alt(
                        tok(TokenKind.Assign),
                        tok(TokenKind.MultiplyAssign),
                        tok(TokenKind.DivideAssign),
                        tok(TokenKind.ModulusAssign),
                        tok(TokenKind.PlusAssign),
                        tok(TokenKind.MinusAssign)
                    ),
                    Expression
                )
            )
        ),
        (value, [token]) => (value[1] ? {
            type: 'AssignmentExpression',
            left: value[0],
            operator: value[1][0].text as '=' | '*=' | '/=' | '%=' | '+=' | '-=',
            right: value[1][1],
            position: token!.pos
        } : value[0])
    )
);
TernaryExpression.setPattern(
    apply(
        seq(
            LogicalOrExpression,
            opt(
                seq(
                    kright(
                        tok(TokenKind.QuestionMark),
                        Expression
                    ),
                    kright(
                        tok(TokenKind.Colon),
                        Expression
                    )
                )
            )
        ),
        (value, [token]) => (value[1] ? {
            type: 'TernaryExpression',
            condition: value[0],
            then: value[1][0],
            else: value[1][0],
            position: token!.pos
        } : value[0])
    )
);
LogicalOrExpression.setPattern(
    lrec_sc(
        LogicalAndExpression,
        kright(
            tok(TokenKind.Or),
            LogicalAndExpression
        ),
        (a, b) => (b ? {
            type: 'LogicalOrExpression',
            left: a,
            right: b
        } : a)
    )
);
LogicalAndExpression.setPattern(
    lrec_sc(
        BitOrExpression,
        kright(
            tok(TokenKind.And),
            BitOrExpression
        ),
        (a, b) => (b ? {
            type: 'LogicalAndExpression',
            left: a,
            right: b
        } : a)
    )
);
BitOrExpression.setPattern(
    lrec_sc(
        BitXOrExpression,
        kright(
            tok(TokenKind.BitOr),
            BitXOrExpression
        ),
        (a, b) => (b ? {
            type: 'BitOrExpression',
            left: a,
            right: b
        } : a)
    )
);
BitXOrExpression.setPattern(
    lrec_sc(
        BitAndExpression,
        kright(
            tok(TokenKind.BitXOr),
            BitAndExpression
        ),
        (a, b) => (b ? {
            type: 'BitXOrExpression',
            left: a,
            right: b
        } : a)
    )
);
BitAndExpression.setPattern(
    lrec_sc(
        EqualityExpression,
        kright(
            tok(TokenKind.BitAnd),
            EqualityExpression
        ),
        (a, b) => (b ? {
            type: 'BitAndExpression',
            left: a,
            right: b
        } : a)
    )
);
EqualityExpression.setPattern(
    lrec_sc(
        RelationalExpression,
        seq(
            alt(
                tok(TokenKind.Equals),
                tok(TokenKind.NotEquals),
                tok(TokenKind.IdentityEquals),
                tok(TokenKind.IdentityNotEquals)
            ),
            RelationalExpression
        ),
        (a, b) => (b ? {
            type: 'EqualityExpression',
            left: a,
            operator: b[0].text as '==' | '!=' | '!=' | '!==',
            right: b[1]
        } : a)
    )
);
RelationalExpression.setPattern(
    lrec_sc(
        BitShiftExpression,
        seq(
            alt(
                tok(TokenKind.LessThan),
                tok(TokenKind.MoreThan),
                tok(TokenKind.LessThanEquals),
                tok(TokenKind.GreaterThanEquals)
            ),
            BitShiftExpression
        ),
        (a, b) => (b ? {
            type: 'RelationalExpression',
            left: a,
            operator: b[0].text as '<' | '>' | '<=' | '>=',
            right: b[1]
        } : a)
    )
);
BitShiftExpression.setPattern(
    lrec_sc(
        AdditiveExpression,
        seq(
            alt(
                tok(TokenKind.LeftShiftArithmetic),
                tok(TokenKind.RightShiftArithmetic),
                tok(TokenKind.RightShiftLogical)
            ),
            AdditiveExpression
        ),
        (a, b) => (b ? {
            type: 'BitShiftExpression',
            left: a,
            operator: b[0].text as '>>' | '<<' | '>>>',
            right: b[1]
        } : a)
    )
);
AdditiveExpression.setPattern(
    lrec_sc(
        MultiplicativeExpression,
        seq(
            alt(
                tok(TokenKind.Plus),
                tok(TokenKind.Minus)
            ),
            MultiplicativeExpression
        ),
        (a, b) => (b ? {
            type: 'AdditiveExpression',
            left: a,
            operator: b[0].text as '+' | '-',
            right: b[1]
        } : a)
    )
);
MultiplicativeExpression.setPattern(
    lrec_sc(
        AssertionExpression,
        seq(
            alt(
                tok(TokenKind.Multiply),
                tok(TokenKind.Divide),
                tok(TokenKind.Modulus)
            ),
            AssertionExpression
        ),
        (a, b) => (b ? {
            type: 'MultiplicativeExpression',
            left: a,
            operator: b[0].text as '*' | '/' | '%',
            right: b[1]
        } : a)
    )
);
AssertionExpression.setPattern(
    lrec_sc(
        UnaryExpression,
        kright(
            tok(TokenKind.As),
            Type
        ),
        (a, b) => (b ? {
            type: 'AssertionExpression',
            expression: a,
            typeAnnotation: b
        } : a)
    )
);
UnaryExpression.setPattern(
    alt(
        UpdateExpression,
        UnaryPlusExpression,
        UnaryMinusExpression,
        BitNotExpression,
        NotExpression,
        NewExpression,
        DeleteExpression,
        SizeofExpression
    )
);
UnaryPlusExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.Plus),
            UnaryExpression
        ),
        (value, [token]) => ({
            type: 'UnaryPlusExpression',
            expression: value,
            position: token!.pos
        })
    )
);
UnaryMinusExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.Minus),
            UnaryExpression
        ),
        (value, [token]) => ({
            type: 'UnaryMinusExpression',
            expression: value,
            position: token!.pos
        })
    )
);
BitNotExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.BitNot),
            UnaryExpression
        ),
        (value, [token]) => ({
            type: 'BitNotExpression',
            expression: value,
            position: token!.pos
        })
    )
);
NotExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.Not),
            UnaryExpression
        ),
        (value, [token]) => ({
            type: 'NotExpression',
            expression: value,
            position: token!.pos
        })
    )
);
NewExpression.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.New),
                Identifier
            ),
            Arguments
        ),
        (value, [token]) => ({
            type: 'NewExpression',
            identifier: value[0],
            arguments: value[1],
            position: token!.pos
        })
    )
);
DeleteExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.Delete),
            UnaryExpression
        ),
        (value, [token]) => ({
            type: 'DeleteExpression',
            expression: value,
            position: token!.pos
        })
    )
);
SizeofExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.Sizeof),
            Type
        ),
        (value, [token]) => ({
            type: 'SizeofExpression',
            typeAnnotation: value,
            position: token!.pos
        })
    )
);
UpdateExpression.setPattern(
    alt(
        PostIncrementExpression,
        PostDecrementExpression,
        PreIncrementExpression,
        PreDecrementExpression,
        PostfixExpression
    )
);
PostIncrementExpression.setPattern(
    apply(
        kleft(
            PostfixExpression,
            tok(TokenKind.PlusPlus)
        ),
        (value, [token]) => ({
            type: 'PostIncrementExpression',
            expression: value,
            position: token!.pos
        })
    )
);
PostDecrementExpression.setPattern(
    apply(
        kleft(
            PostfixExpression,
            tok(TokenKind.MinusMinus)
        ),
        (value, [token]) => ({
            type: 'PostDecrementExpression',
            expression: value,
            position: token!.pos
        })
    )
);
PreIncrementExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.PlusPlus),
            PostfixExpression
        ),
        (value, [token]) => ({
            type: 'PreIncrementExpression',
            expression: value,
            position: token!.pos
        })
    )
);
PreDecrementExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.MinusMinus),
            PostfixExpression
        ),
        (value, [token]) => ({
            type: 'PreDecrementExpression',
            expression: value,
            position: token!.pos
        })
    )
);
interface IndexExpressionPostfixPart {
    type: 'IndexExpressionPostfixPart',
    index: ExpressionContext,
    position: Position
}
interface MemberExpressionPostfixPart {
    type: 'MemberExpressionPostfixPart',
    identifier: string,
    position: Position
}
interface CallExpressionPostfixPart {
    type: 'CallExpressionPostfixPart',
    arguments: ArgumentsContext,
    position: Position
}
PostfixExpression.setPattern(
    lrec_sc(
        PrimaryExpression,
        alt(
            IndexExpression,
            MemberExpression,
            CallExpression
        ),
        (a, b) => (b ? (
            b.type === 'IndexExpressionPostfixPart'
                ? {
                    type: 'IndexExpression',
                    expression: a,
                    index: b.index,
                    position: b.position
                } : b.type === 'MemberExpressionPostfixPart'
                    ? {
                        type: 'MemberExpression',
                        expression: a,
                        identifier: b.identifier,
                        position: b.position
                    } : {
                        type: 'CallExpression',
                        expression: a,
                        arguments: b.arguments,
                        position: b.position
                    }
        ) : a)
    )
);
IndexExpression.setPattern(
    apply(
        kmid(
            tok(TokenKind.OpenBracket),
            Expression,
            tok(TokenKind.CloseBracket)
        ),
        (value, [token]) => ({
            type: 'IndexExpressionPostfixPart',
            index: value,
            position: token!.pos
        })
    )
);
MemberExpression.setPattern(
    apply(
        kright(
            tok(TokenKind.Dot),
            tok(TokenKind.Identifier)
        ),
        (value, [token]) => ({
            type: 'MemberExpressionPostfixPart',
            identifier: value.text,
            position: token!.pos
        })
    )
);
CallExpression.setPattern(
    apply(
        Arguments,
        (value, [token]) => ({
            type: 'CallExpressionPostfixPart',
            arguments: value,
            position: token!.pos
        })
    )
);
PrimaryExpression.setPattern(
    alt(
        ThisExpression,
        Identifier,
        SuperExpression,
        Literal,
        ParenthesizedExpression
    )
);
ThisExpression.setPattern(
    apply(
        tok(TokenKind.This),
        (value, [token]) => ({
            type: 'ThisExpression',
            position: token!.pos
        })
    )
);
SuperExpression.setPattern(
    apply(
        tok(TokenKind.Super),
        (value, [token]) => ({
            type: 'SuperExpression',
            position: token!.pos
        })
    )
);
ParenthesizedExpression.setPattern(
    apply(
        kmid(
            tok(TokenKind.OpenParen),
            Expression,
            tok(TokenKind.CloseParen)
        ),
        (value, [token]) => ({
            type: 'ParenthesizedExpression',
            expression: value,
            position: token!.pos
        })
    )
);
Literal.setPattern(
    alt(
        NullLiteral,
        BooleanLiteral,
        StringLiteral,
        NumberLiteral,
        ArrayLiteral
    )
);
NullLiteral.setPattern(
    apply(
        tok(TokenKind.NullLiteral),
        (value, [token]) => ({
            type: 'NullLiteral',
            position: token!.pos
        })
    )
);
BooleanLiteral.setPattern(
    apply(
        tok(TokenKind.BooleanLiteral),
        (value, [token]) => ({
            type: 'BooleanLiteral',
            text: value.text as 'true' | 'false',
            position: token!.pos
        })
    )
);
StringLiteral.setPattern(
    apply(
        tok(TokenKind.StringLiteral),
        (value, [token]) => ({
            type: 'StringLiteral',
            text: value.text.slice(1, -1),
            position: token!.pos
        })
    )
);
NumberLiteral.setPattern(
    apply(
        alt(
            tok(TokenKind.DecimalIntegerLiteral),
            tok(TokenKind.DecimalFloatLiteral),
            tok(TokenKind.HexIntegerLiteral)
        ),
        (value, [token]) => ({
            type: 'NumberLiteral',
            isFloat: value.kind === TokenKind.DecimalFloatLiteral,
            number: value.kind === TokenKind.DecimalIntegerLiteral
                ? parseInt(value.text)
                : value.kind === TokenKind.DecimalFloatLiteral
                    ? parseFloat(value.text)
                    : parseInt(value.text, 10),
            position: token!.pos
        })
    )
);
ArrayLiteral.setPattern(
    apply(
        kmid(
            tok(TokenKind.OpenBracket),
            opt(
                list_sc(
                    Expression,
                    tok(TokenKind.Comma)
                )
            ),
            tok(TokenKind.CloseBracket)
        ),
        (value, [token]) => ({
            type: 'ArrayLiteral',
            items: value ?? [],
            position: token!.pos
        })
    )
);
Parameter.setPattern(
    apply(
        seq(
            tok(TokenKind.Identifier),
            TypeAnnotation
        ),
        (value, [token]) => ({
            type: 'Parameter',
            identifier: value[0].text,
            typeAnnotation: value[1],
            position: token!.pos
        })
    )
);
ParameterList.setPattern(
    apply(
        opt(
            list_sc(
                Parameter,
                tok(TokenKind.Colon)
            )
        ),
        (value) => value ?? []
    )
);
Arguments.setPattern(
    apply(
        kmid(
            tok(TokenKind.OpenParen),
            opt(
                list_sc(
                    Expression,
                    tok(TokenKind.Comma)
                )
            ),
            tok(TokenKind.CloseParen)
        ),
        (value, [token]) => ({
            type: 'Arguments',
            items: value ?? [],
            position: token!.pos
        })
    )
);
Type.setPattern(
    apply(
        alt(
            tok(TokenKind.Void),
            seq(
                Identifier,
                rep_sc(
                    kmid(
                        tok(TokenKind.OpenBracket),
                        tok(TokenKind.DecimalIntegerLiteral),
                        tok(TokenKind.CloseBracket)
                    )
                )
            )
        ),
        (value, [token]) => Array.isArray(value)
            ? {
                type: 'Type',
                isVoid: false,
                identifier: value[0],
                dimensions: value[1].map(e => parseInt(e.text)),
                position: token!.pos
            }
            : {
                type: 'Type',
                isVoid: true,
                position: token!.pos
            }
    )
);
TypeAnnotation.setPattern(
    kright(
        tok(TokenKind.Colon),
        Type
    )
);
Identifier.setPattern(
    apply(
        list_sc(
            tok(TokenKind.Identifier),
            tok(TokenKind.Scope)
        ),
        (value, [token]) => ({
            type: 'Identifier',
            identifiers: value.map(e => e.text),
            position: token!.pos
        })
    )
);
export default Module;