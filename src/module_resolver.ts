import path from 'path';
const module_resolver = (sourcePath: string, targetPath: string): string => {
    const sourceDirectory = path.dirname(sourcePath);
    return path.join(sourceDirectory, targetPath);
};
export default module_resolver;