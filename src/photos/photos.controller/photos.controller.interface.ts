import { NextFunction, Response, Request, Router } from 'express';

export interface IPhotosController {
	router: Router;
	getPhoto: (req: Request, res: Response, next: NextFunction) => void;
	savePhoto: (req: Request, res: Response, next: NextFunction) => void;
	getAllPhotos: (req: Request, res: Response, next: NextFunction) => void;
}
