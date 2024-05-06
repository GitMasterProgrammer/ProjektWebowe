export function unsetKeys<T extends Record<string, any>>(obj: T, keysToRemove: (keyof T)[]): Partial<T> {
    const newObj = { ...obj };
    
    keysToRemove.forEach(key => {
        delete newObj[key];
    });
    
    return newObj;
}