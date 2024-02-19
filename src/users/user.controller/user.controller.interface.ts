import { NextFunction, Response, Request, Router } from 'express';

export interface IUserController {
	router: Router;
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}
