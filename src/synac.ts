import compile from './compile.js';
import parse_parameter from './parse_parameter.js';

const options = parse_parameter(process.argv);
compile(options);