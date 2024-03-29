import path from 'path';

const parse_parameter = (argv: string[]): CompilerOptions => {
    const options: CompilerOptions = {};
    while (argv.length) {
        const arg = argv.shift();
        switch (arg) {
            case '--':
                break;
            case '--help': {
                options.help = true;
                break;
            }
            case '--dev': {
                options.dev = true;
                break;
            }
            case '--ir': {
                options.ir = true;
                break;
            }
            case '--wasm': {
                options.wasm = true;
                break;
            }
            case '-o': {
                options.outputPath = argv.shift();
                break;
            }
            case '-rootDir': {
                options.rootDir = argv.shift();
                break;
            }
            default: {
                options.filePath = arg;
                if (!path.extname(arg ?? '')) options.filePath += '.syn';
            }
        }
    }
    return options;
};
export default parse_parameter;
