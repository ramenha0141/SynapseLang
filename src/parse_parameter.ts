const parse_parameter = (argv: string[]): CompilerOptions => {
    const parameter: CompilerOptions = {};
    while (argv.length) {
        const arg = argv.shift();
        switch (arg) {
            case '--help': {
                parameter.help = true;
                break;
            }
            case '-o': {
                parameter.filePath = argv.shift();
                break;
            }
            case '-arch': {
                parameter.arch = argv.shift();
                break;
            }
            case '-sys': {
                parameter.sys = argv.shift();
                break;
            }
            default: {
                parameter.filePath = arg;
            }
        }
    }
    return parameter;
};
export default parse_parameter;