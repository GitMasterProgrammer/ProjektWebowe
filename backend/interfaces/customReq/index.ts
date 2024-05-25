import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    convertedQuery?: { [key: string]: string | number | boolean | undefined };
}

export default CustomRequest;