import { Request, Response, NextFunction } from 'express';
import CustomRequest from '../../interfaces/customReq';

function autoConvertTypes(req: CustomRequest, res: Response, next: NextFunction) {
    const queryParams = req.query;
    req.convertedQuery = {};

    for (const key in queryParams) {
        const value = queryParams[key];
        if (value === 'true') {
            req.convertedQuery[key] = true;
        } else if (value === 'false') {
            req.convertedQuery[key] = false;
        } else if (!isNaN(value as any)) {
            req.convertedQuery[key] = parseInt(value as string, 10);
        } else {
            req.convertedQuery[key] = value?.toString();
        }
    }

    next();
}

export default autoConvertTypes;