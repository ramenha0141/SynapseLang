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
const ClassField = rule<TokenKind, ClassFieldContext>();
const ClassMethod = rule<TokenKind, ClassMethodContext>();
const Statement = rule<TokenKind, StatementContext>();
const BlockStatement = rule<TokenKind, BlockStatementContext>();
const ExpressionStatement = rule<TokenKind, ExpressionStatementContext>();
const ReturnStatement = rule<TokenKind, ReturnStatementContext>();
const IfStatement = rule<TokenKind, IfStatementContext>();
const WhileStatement = rule<TokenKind, WhileStatementContext>();
const ForStatement = rule<TokenKind, ForStatementContext>();
const BreakStatement = rule<TokenKind, BreakStatementContext>();
const ContinueStatement = rule<TokenKind, ContinueStatementContext>();
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
            identifiers: value[0].map(e => e.text),
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
            type: 'VariableDeclaration'
        })
    )
)
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