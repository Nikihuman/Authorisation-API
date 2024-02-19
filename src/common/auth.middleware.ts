import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { IJWTService } from '../jwt/jwt.service.interface';
import { HttpError } from '../errors/http-error.class';
import { IUsersService } from '../users/users.service/users.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class AuthMiddleware implements IMiddleware {
	constructor(
		@inject(TYPES.IJWTService) private jwtService: IJWTService,
		@inject(TYPES.IUsersService) private usersService: IUsersService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
	) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.headers.authorization) {
			return next(new HttpError('Token not sent', 401, 'authorization'));
		}
		const payload = await this.jwtService.verifyJWT(
			req.headers.authorization.split(' ')[1],
			this.configService.get('SECRET'),
		);
		if (payload instanceof HttpError) {
			return next(payload);
		}
		const isExistedUser = await this.usersService.find(payload.email);
		if (isExistedUser instanceof HttpError) {
			return next(isExistedUser);
		}
		req.email = isExistedUser.email;
		next();
	}
}
