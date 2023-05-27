// import { NextFunction, Request, Response } from 'express';
// import { createNamespace } from 'continuation-local-storage';

// export const contextMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const namespace = createNamespace('userctx');
//   namespace.bindEmitter(req);
//   namespace.bindEmitter(res);

//   namespace.run(() => {
//     next();
//   });
// };
