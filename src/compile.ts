import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import child_process from 'child_process';

import * as llvm from './llvm';
import parser from './parser';
import module_resolver from './module_resolver';
import Module, { ModuleMap } from './common/Module';
import builtins from './builtins';
import create_main from './create_main';
const compile = (options: CompilerOptions) => {
    global.dev = !!options.dev;
    const entryPath = options.filePath ?? 'index.syn';
    const rootDir = options.rootDir ?? './';
    const builtinsPath = '';
    const moduleMap: ModuleMap = {};
    global.llvmModule = new llvm.Module(entryPath);
    global.builder = new llvm.IRBuilder();
    global.classMap = new Map();
    global.sourceMap = new Map();
    const loadModule = (modulePath: string, isBuiltin?: boolean) => {
        global.currentPath = isBuiltin
                ? path.join(builtinsPath, modulePath + '.syn')
                : path.join(rootDir, modulePath);
        const source = fs.readFileSync(
            currentPath,
            'utf-8'
        );
        global.sourceMap.set(global.currentPath, source.split('\n'));
        const moduleContext = parser(source);
        const module = new Module(modulePath, moduleContext.declarations, builtins(llvmModule));
        for (const importContext of moduleContext.importDeclarations) {
            switch (importContext.type) {
                case 'ImportDefineDeclaration': {
                    const targetPath = module_resolver(modulePath, importContext.path);
                    if (!moduleMap[targetPath]) {
                        loadModule(targetPath);
                    }
                    for (const identifier of importContext.defines) {
                        module.import(identifier, moduleMap[targetPath].getSymbol(identifier));
                    }
                    break;
                }
                case 'ImportNamespaceDeclaration': {
                    const targetPath = module_resolver(modulePath, importContext.path);
                    if (!moduleMap[targetPath]) {
                        loadModule(targetPath);
                    }
                    module.import(importContext.identifier, moduleMap[targetPath]);
                    break;
                }
                case 'ImportBuiltinDeclaration': {
                    const targetPath = importContext.identifier;
                    if (!moduleMap[targetPath]) {
                        loadModule(targetPath, true);
                    }
                    module.import(importContext.identifier, moduleMap[targetPath]);
                    break;
                }
            }
        }
        moduleMap[modulePath] = module;
    };
    loadModule(entryPath);
    create_main(moduleMap[entryPath]);
    const IR = llvmModule.print();
    if (options.ir) {
        fs.writeFileSync(options.outputPath ?? `${path.basename(options.filePath ?? 'a', '.syn')}.ll`, IR);
    } else {
        const tmpFile = tmp.fileSync({ postfix: '.ll' });
        fs.writeFileSync(tmpFile.name, IR);
        child_process.execFile('clang', [
            tmpFile.name,
            '-o', options.outputPath ?? `${path.basename(options.filePath ?? 'a', '.syn')}${process.platform === 'win32' ? '.exe': ''}`
        ], (error, stdout, stderr) => {
            tmpFile.removeCallback();
            if (error) return console.log(error);
            if (/^warning: overriding the module target triple/.test(stderr)) return;
            console.log(stderr);
        });
    }

};
export default compile;