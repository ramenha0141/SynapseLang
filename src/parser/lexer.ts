import { buildLexer } from 'typescript-parsec';
import TokenKind from './TokenKind.js';
const lexer = buildLexer([
    [false, /^\/\*.*?\*\//g, TokenKind.MultilineComment],
    [false, /^\/\/[^\r\n]*/g, TokenKind.SingleLineComment],
    [true, /^\[/g, TokenKind.OpenBracket],
    [true, /^\]/g, TokenKind.CloseBracket],
    [true, /^\(/g, TokenKind.OpenParen],
    [true, /^\)/g, TokenKind.CloseParen],
    [true, /^\{/g, TokenKind.OpenBrace],
    [true, /^\}/g, TokenKind.CloseBrace],
    [true, /^;/g, TokenKind.SemiColon],
    [true, /^,/g, TokenKind.Comma],
    [true, /^=/g, TokenKind.Assign],
    [true, /^\?/g, TokenKind.QuestionMark],
    [true, /^::/g, TokenKind.Scope],
    [true, /^:/g, TokenKind.Colon],
    [true, /^\./g, TokenKind.Dot],
    [true, /^\+\+/g, TokenKind.PlusPlus],
    [true, /^--/g, TokenKind.MinusMinus],
    [true, /^\+/g, TokenKind.Plus],
    [true, /^-/g, TokenKind.Minus],
    [true, /^~/g, TokenKind.BitNot],
    [true, /^!/g, TokenKind.Not],
    [true, /^\*/g, TokenKind.Multiply],
    [true, /^\//g, TokenKind.Divide],
    [true, /^%/g, TokenKind.Modulus],
    [true, /^\*\*/g, TokenKind.Power],
    [true, /^\?\?/g, TokenKind.NullCoalesce],
    [true, /^#/g, TokenKind.Hashtag],
    [true, /^>>/g, TokenKind.RightShiftArithmetic],
    [true, /^<</g, TokenKind.LeftShiftArithmetic],
    [true, /^>>>/g, TokenKind.RightShiftLogical],
    [true, /^</g, TokenKind.LessThan],
    [true, /^>/g, TokenKind.MoreThan],
    [true, /^<=/g, TokenKind.LessThanEquals],
    [true, /^>=/g, TokenKind.GreaterThanEquals],
    [true, /^==/g, TokenKind.Equals],
    [true, /^!=/g, TokenKind.NotEquals],
    [true, /^===/g, TokenKind.IdentityEquals],
    [true, /^!==/g, TokenKind.IdentityNotEquals],
    [true, /^&/g, TokenKind.BitAnd],
    [true, /^\^/g, TokenKind.BitXOr],
    [true, /^\|/g, TokenKind.BitOr],
    [true, /^&&/g, TokenKind.And],
    [true, /^\|\|/g, TokenKind.Or],
    [true, /^\*=/g, TokenKind.MultiplyAssign],
    [true, /^\/=/g, TokenKind.DivideAssign],
    [true, /^%=/g, TokenKind.ModulusAssign],
    [true, /^\+=/g, TokenKind.PlusAssign],
    [true, /^-=/g, TokenKind.MinusAssign],
    [true, /^\|>/g, TokenKind.Pipeline],
    [true, /^null/g, TokenKind.NullLiteral],
    [true, /^(true|false)/g, TokenKind.BooleanLiteral],
    [true, /^(0|[1-9][0-9]*)/g, TokenKind.DecimalIntegerLiteral],
    [true, /^[1-9][0-9]*\.[0-9]+/g, TokenKind.DecimalFloatLiteral],
    [true, /^0[xX][0-9a-fA-F]+/g, TokenKind.HexIntegerLiteral],
    [true, /^('([^'\\\r\n]|\\['"bfnrtv])*'|"([^"\\\r\n]|\\['"bfnrtv])*")/g, TokenKind.StringLiteral],
    [true, /^from/g, TokenKind.From],
    [true, /^function/g, TokenKind.Function],
    [true, /^declare/g, TokenKind.Declare],
    [true, /^new/g, TokenKind.New],
    [true, /^delete/g, TokenKind.Delete],
    [true, /^class/g, TokenKind.Class],
    [true, /^extends/g, TokenKind.Extends],
    [true, /^super/g, TokenKind.Super],
    [true, /^this/g, TokenKind.This],
    [true, /^constructor/g, TokenKind.Constructor],
    [true, /^break/g, TokenKind.Break],
    [true, /^sizeof/g, TokenKind.Sizeof],
    [true, /^case/g, TokenKind.Case],
    [true, /^else/g, TokenKind.Else],
    [true, /^return/g, TokenKind.Return],
    [true, /^void/g, TokenKind.Void],
    [true, /^continue/g, TokenKind.Continue],
    [true, /^fir/g, TokenKind.For],
    [true, /^in/g, TokenKind.In],
    [true, /^switch/g, TokenKind.Switch],
    [true, /^while/g, TokenKind.While],
    [true, /^default/g, TokenKind.Default],
    [true, /^if/g, TokenKind.If],
    [true, /^import/g, TokenKind.Import],
    [true, /^as/g, TokenKind.As],
    [true, /^let/g, TokenKind.Let],
    [true, /^const/g, TokenKind.Const],
    [true, /^[a-zA-Z_$][a-zA-Z0-9_]*/g, TokenKind.Identifier],
    [false, /^[\t\u000C\u0020\u00A0]+/g, TokenKind.WhiteSpaces],
    [false, /^[\r\n]/g, TokenKind.LineTerminator]
]);
export default lexer;