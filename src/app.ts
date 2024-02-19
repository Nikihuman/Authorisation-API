import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserController } from './users/user.controller/user.controller.interface';
import { PrismaService } from './database/prisma.service';
import cors, { CorsOptions } from 'cors';
import { IPhotosController } from './photos/photos.controller/photos.controller.interface';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	corsOptions: CorsOptions;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.IUserController) private authController: IUserController,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.IPhotosController) private photosController: IPhotosController,
		@inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
	) {
		this.app = express();
		this.port = 8000;
		this.corsOptions = { origin: '*' };
	}

	private useMiddleware(): void {
		this.app.use(cors(this.corsOptions));
		this.app.use(express.json());
	}

	private useRoutes(): void {
		this.app.use('/auth', this.authController.router);
		this.app.use(
			'/photo',
			this.authMiddleware.execute.bind(this.authMiddleware),
			this.photosController.router,
		);
	}

	private useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server work on http://localhost:${this.port}`);
		});
	}
}
