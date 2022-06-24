import { SynacError } from './common/Errors.js';
import compile from './compile.js';
import parse_parameter from './parse_parameter.js';

try {
    const options = parse_parameter(process.argv.slice(2));
    compile(options);
} catch (error) {
    if (error instanceof SynacError) {
        console.log(error.toString());
        process.exit(1);
    } else {
        throw error;
    }
}