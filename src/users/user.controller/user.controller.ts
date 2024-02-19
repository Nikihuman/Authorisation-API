import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { IUserController as IUserController } from './user.controller.interface';
import { NextFunction, Response, Request } from 'express';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { IUsersService } from '../users.service/users.service.interface';
import { HttpError } from '../../errors/http-error.class';
import { IJWTService } from '../../jwt/jwt.service.interface';
import { IConfigService } from '../../config/config.service.interface';
import { AuthMiddleware } from '../../common/auth.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.IJWTService) private jwtService: IJWTService,
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.IUsersService) private userService: IUsersService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'post',
				middlewares: [new ValidateMiddleware(LoginDTO)],
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(RegisterDTO)],
			},
			{
				path: '/info',
				func: this.info,
				method: 'get',
				middlewares: [this.authMiddleware],
			},
		]);
	}

	async login(
		{ body, ...req }: Request<{}, {}, LoginDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (result instanceof HttpError) {
			return next(result);
		}
		const jwt = await this.jwtService.singJWT(
			result.email,
			result.name,
			this.configService.get('SECRET'),
		);
		if (jwt instanceof HttpError) {
			return next(jwt);
		}
		this.ok(res, { message: 'Success Login', access_token: jwt });
	}
	async register(
		{ body }: Request<{}, {}, RegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (result instanceof HttpError) {
			return next(result);
		}
		const jwt = await this.jwtService.singJWT(
			result.email,
			result.name,
			this.configService.get('SECRET'),
		);
		if (jwt instanceof HttpError) {
			return next(jwt);
		}
		this.ok(res, { message: 'Success Registration', access_token: jwt });
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const data = await this.userService.find(req.email);
		if (data instanceof HttpError) {
			return next(data);
		}
		this.ok(res, { email: data.email, name: data.name });
	}
}
