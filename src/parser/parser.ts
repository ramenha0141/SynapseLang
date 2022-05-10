import { alt, apply, kleft, kmid, kright, list, opt, rep, rule, seq, tok } from 'typescript-parsec';
import TokenKind from './TokenKind.js';
const ModuleRule = rule<TokenKind, ModuleContext>();
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
const IndexExpression = rule<TokenKind, IndexExpressionContext>();
const MemberExpression = rule<TokenKind, MemberExpressionContext>();
const NewExpression = rule<TokenKind, NewExpressionContext>();
const DeleteExpression = rule<TokenKind, DeleteExpressionContext>();
const CallExpression = rule<TokenKind, CallExpressionContext>();
const PostIncrementExpression = rule<TokenKind, PostIncrementExpressionContext>();
const PostDecrementExpression = rule<TokenKind, PostDecrementExpressionContext>();
const PreIncrementExpression = rule<TokenKind, PreIncrementExpressionContext>();
const PreDecrementExpression = rule<TokenKind, PreDecrementExpressionContext>();
const UnaryPlusExpression = rule<TokenKind, UnaryPlusExpressionContext>();
const UnaryMinusExpression = rule<TokenKind, UnaryMinusExpressionContext>();
const BitNotExpression = rule<TokenKind, BitNotExpressionContext>();
const NotExpression = rule<TokenKind, NotExpressionContext>();
const AssertionExpression = rule<TokenKind, AssertionExpressionContext>();
const MultiplicativeExpression = rule<TokenKind, MultiplicativeExpressionContext>();
const AdditiveExpression = rule<TokenKind, AdditiveExpressionContext>();
const BitShiftExpression = rule<TokenKind, BitShiftExpressionContext>();
const RelationalExpression = rule<TokenKind, RelationalExpressionContext>();
const EqualityExpression = rule<TokenKind, EqualityExpressionContext>();
const BitAndExpression = rule<TokenKind, BitAndExpressionContext>();
const BitXOrExpression = rule<TokenKind, BitXOrExpressionContext>();
const BitOrExpression = rule<TokenKind, BitOrExpressionContext>();
const LogicalAndExpression = rule<TokenKind, LogicalAndExpressionContext>();
const LogicalOrExpression = rule<TokenKind, LogicalOrExpressionContext>();
const TernaryExpression = rule<TokenKind, TernaryExpressionContext>();
const AssignmentExpression = rule<TokenKind, AssignmentExpressionContext>();
const SizeofExpression = rule<TokenKind, SizeofExpressionContext>();
const ThisExpression = rule<TokenKind, ThisExpressionContext>();
const SuperExpression = rule<TokenKind, SuperExpressionContext>();
const ParenthesizedExpression = rule<TokenKind, ParenthesizedExpressionContext>();
const Literal = rule<TokenKind, LiteralContext>();
const NullLiteral = rule<TokenKind, NullLiteralContext>();
const BooleanLiteral = rule<TokenKind, BooleanLiteralContext>();
const StringLiteral = rule<TokenKind, StringLiteralContext>();
const NumberLiteral = rule<TokenKind, NumberLiteralContext>();
const ArrayLiteral = rule<TokenKind, ArrayLiteralContext>();
const Parameter = rule<TokenKind, ParameterContext>();
const ParameterList = rule<TokenKind, ParameterContext[]>();
const Type = rule<TokenKind, TypeContext>();
const TypeAnnotation = rule<TokenKind, TypeContext>();
const Identifier = rule<TokenKind, IdentifierContext>();
const eos = tok(TokenKind.SemiColon);
ModuleRule.setPattern(
    apply(
        seq(
            rep(ImportDeclaration),
            rep(Declaration)
        ),
        (value) => ({
            type: 'Module',
            importDeclarations: value[0],
            declarations: value[1]
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
                    list(
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
        (value) => ({
            type: 'ImportDefineDeclaration',
            defines: value[0].map(e => e.text),
            path: value[1].text.slice(1, -1)
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
        (value) => ({
            type: 'ImportNamespaceDeclaration',
            identifier: value[0].text,
            path: value[1].text.slice(1, -1)
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
        (value) => ({
            type: 'ImportBuiltinDeclaration',
            identifier: value.text
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
            TypeAnnotation,
            BlockStatement
        ),
        (value) => ({
            type: 'FunctionDeclaration',
            identifier: value[0].text,
            parameterList: value[1],
            typeAnnotation: value[2],
            body: value[3]
        })
    )
);
DeclareDeclaration.setPattern(
    apply(
        seq(
            kright(
                tok(TokenKind.Declare),
                list(
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
        (value) => ({
            type: 'DeclareDeclaration',
            identifier: value[0].join('.'),
            alias: value[1]?.text,
            parameters: value[2],
            typeAnnotation: value[3]
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
        (value) => ({
            type: 'VariableDeclaration',
            isConstant: value[0].kind === TokenKind.Const,
            identifier: value[1].text,
            typeAnnotation: value[2],
            expression: value[3]
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
                seq(
                    ClassConstructor,
                    rep(
                        alt(
                            ClassField,
                            ClassMethod
                        )
                    )
                ),
                tok(TokenKind.CloseBrace)
            )
        ),
        (value) => ({
            type: 'ClassDeclaration',
            identifier: value[0].text,
            extends: value[1],
            constructor: value[2][0],
            fields: value[2][1].filter((e): e is ClassFieldContext => e.type === 'ClassField'),
            methods: value[2][1].filter((e): e is ClassMethodContext => e.type === 'ClassMethod')
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
        (value) => ({
            type: 'ClassConstructor',
            parameterList: value[0],
            body: value[1]
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
        (value) => ({
            type: 'ClassField',
            identifier: value[0].text,
            typeAnnotation: value[1]
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
            TypeAnnotation,
            BlockStatement
        ),
        (value) => ({
            type: 'ClassMethod',
            identifier: value[0].text,
            parameterList: value[1],
            typeAnnotation: value[2],
            body: value[3]
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
            rep(
                Statement
            ),
            tok(TokenKind.CloseBrace)
        ),
        (value) => ({
            type: 'BlockStatement',
            statements: value
        })
    )
);
ExpressionStatement.setPattern(
    apply(
        kleft(
            Expression,
            eos
        ),
        (value) => ({
            type: 'ExpressionStatement',
            expression: value
        })
    )
);
ReturnStatement.setPattern(
    apply(
        kmid(
            tok(TokenKind.Return),
            Expression,
            eos
        ),
        (value) => ({
            type: 'ReturnStatement',
            expression: value
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
        (value) => ({
            type: 'IfStatement',
            condition: value[0],
            then: value[1],
            else: value[2]
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
        (value) => ({
            type: 'WhileStatement',
            condition: value[0],
            then: value[1]
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
        (value) => ({
            type: 'ForNormalStatement',
            initialization: value[0][0],
            condition: value[0][1],
            final: value[0][2],
            then: value[1]
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
        (value) => ({
            type: 'ForInStatement',
            identifier: value[0][0].text,
            expression: value[0][1],
            then: value[1]
        })
    )
);
BreakStatement.setPattern(
    apply(
        seq(
            tok(TokenKind.Break),
            eos
        ),
        (value) => ({
            type: 'BreakStatement'
        })
    )
);
ContinueStatement.setPattern(
    apply(
        seq(
            tok(TokenKind.Continue),
            eos
        ),
        (value) => ({
            type: 'ContinueStatement'
        })
    )
);
Parameter.setPattern(
    apply(
        seq(
            tok(TokenKind.Identifier),
            Type
        ),
        (value) => ({
            type: 'Parameter',
            identifier: value[0].text,
            typeAnnotation: value[1]
        })
    )
);
ParameterList.setPattern(
    list(
        Parameter,
        tok(TokenKind.Colon)
    )
);
Type.setPattern(
    apply(
        alt(
            tok(TokenKind.Void),
            seq(
                Identifier,
                rep(
                    kmid(
                        tok(TokenKind.OpenBracket),
                        tok(TokenKind.DicimalIntegerLiteral),
                        tok(TokenKind.CloseBracket)
                    )
                )
            )
        ),
        (value) => {
            if (Array.isArray(value)) {
                return {
                    type: 'Type',
                    isVoid: false,
                    identifier: value[0],
                    dimension: value[1].map(e => parseInt(e.text))
                };
            } else {
                return {
                    type: 'Type',
                    isVoid: true
                };
            }
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
        list(
            tok(TokenKind.Identifier),
            tok(TokenKind.Scope)
        ),
        (value) => ({
            type: 'Identifier',
            identifiers: value.map(e => e.text)
        })
    )
);