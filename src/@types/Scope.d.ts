interface Scope {
    symbols: { [key: string]: Object },
    getSymbol: (identifier: string) => Object
}