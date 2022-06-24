import { Parser, Token } from 'typescript-parsec';

export interface Range {
    readonly rowBegin: number,
    readonly rowEnd: number,
    readonly columnBegin: number,
    readonly columnEnd: number
}
const applyRange = <TKind, TFrom, TTo>(p: Parser<TKind, TFrom>, callback: (value: TFrom, range: Range) => TTo): Parser<TKind, TTo> => {
    return {
        parse: (token) => {
            const output = p.parse(token);
            if (output.successful) {
                return {
                    candidates: output.candidates.map(function (value) {
                        let lastToken: Token<TKind> = token!;
                        while (lastToken.next) {
                            if (lastToken.next === value.nextToken) break;
                            lastToken = lastToken.next;
                        }
                        const { rowBegin, columnBegin } = token!.pos;
                        const { rowEnd, columnEnd } = lastToken.pos;
                        return {
                            firstToken: token,
                            nextToken: value.nextToken,
                            result: callback(value.result, { rowBegin, columnBegin, rowEnd, columnEnd })
                        };
                    }),
                    successful: true,
                    error: output.error
                };
            }
            else {
                return output;
            }
        }
    };
};
export default applyRange;