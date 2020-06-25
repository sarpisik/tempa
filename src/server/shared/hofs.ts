import { Request, Response, NextFunction } from 'express';

export function withCatch(wrappedController: any) {
    return function wrapperController(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        return wrappedController(req, res, next).catch(next);
    };
}
