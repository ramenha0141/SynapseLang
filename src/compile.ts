import fs from 'fs';
import path from 'path';
import parser from './parser/index.js';
import module_resolver from './module_resolver.js';
const compile = (options: CompilerOptions) => {
    const rootDir = options.rootDir ?? './';
    const entryPath = options.filePath ?? 'index.syn';
};
const loadModule = (modulePath: string, rootDir: string, moduleMap?: ModuleMap): ModuleMap => {
    const source = fs.readFileSync(path.join(rootDir, modulePath), 'utf-8');
    const moduleContext = parser(source);
    const importContexts = moduleContext.importDeclarations;
    moduleMap ??= { entry: moduleContext.declarations };
    for (const importContext of importContexts) {
        switch (importContext.type) {
            case 'ImportDefineDeclaration': {
                const targetPath = module_resolver(modulePath, importContext.path);
                if (!moduleMap[targetPath]) {
                    loadModule(targetPath, rootDir, moduleMap);
                }
                
            }
        }
    }
    return moduleMap;
};
export default compile;