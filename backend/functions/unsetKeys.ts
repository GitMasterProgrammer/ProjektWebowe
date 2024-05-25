export function unsetKeys(obj: any, keys: string[]): any {
    const newObj = { ...obj };
    keys.forEach(key => {
        delete newObj[key];
    });
    return newObj;
}

