import path from 'path';
const module_resolver = (sourcePath: string, targetPath: string): string => {
    if (!path.extname(targetPath)) targetPath += '.syn';
    const sourceDirectory = path.dirname(sourcePath);
    return path.join(sourceDirectory, targetPath);
};
export default module_resolver;