import { ParsedQs } from 'qs';

type QueryParams = { [key: string]: string | undefined  };

export function convertToInt(obj: QueryParams): { [key: string]: number | string  } {
    const convertedObj: { [key: string]: number | string  } = {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value !== undefined) {
                const intValue = parseInt(value, 10);
                if (!isNaN(intValue)) {
                    convertedObj[key] = intValue;
                } else {
                    convertedObj[key] = value;
                }
            }
        }
    }
    
    return convertedObj;
}