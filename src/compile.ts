import fs from 'fs';
import path from 'path';
import parser from './parser';
import module_resolver from './module_resolver';
import Module, { ModuleMap } from './common/Module';
import llvm from 'llvm-bindings';
const compile = (options: CompilerOptions) => {
    const entryPath = options.filePath ?? 'index.syn';
    const rootDir = options.rootDir ?? './';
    const builtinsPath = '';
    const moduleMap: ModuleMap = {};
    llvmContext = new llvm.LLVMContext();
    builder = new llvm.IRBuilder(llvmContext);
    llvmModule = new llvm.Module(entryPath, llvmContext);
    const loadModule = (modulePath: string, isBuiltin?: boolean) => {
        const source = fs.readFileSync(
            isBuiltin
                ? path.join(builtinsPath, modulePath + '.syn')
                : path.join(rootDir, modulePath),
            'utf-8'
        );
        const moduleContext = parser(source);
        const module = new Module(modulePath, moduleContext.declarations);
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
    console.log(moduleMap);
};
export default compile;