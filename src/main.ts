import { Container } from 'inversify';
import { App } from './app';
import { TYPES } from './types';
import 'reflect-metadata';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { IUserController } from './users/user.controller/user.controller.interface';
import { UserController } from './users/user.controller/user.controller';
import { IUsersService } from './users/users.service/users.service.interface';
import { UsersService } from './users/users.service/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository/users.repository.interface';
import { UsersRepository } from './users/users.repository/users.repository';
import { IJWTService } from './jwt/jwt.service.interface';
import { JWTService } from './jwt/jwt.service';
import { PhotosService } from './photos/photos.service/photos.service';
import { IPhotosService } from './photos/photos.service/photos.service.interface';
import { IPhotosRepository } from './photos/photos.repository/photos.repository.interface';
import { PhotosRepository } from './photos/photos.repository/photos.repository';
import { PhotosController } from './photos/photos.controller/photos.controller';
import { IPhotosController } from './photos/photos.controller/photos.controller.interface';
import { AuthMiddleware } from './common/auth.middleware';

export function bootstrap(): App {
	const appContaineer = new Container();
	appContaineer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	appContaineer.bind<App>(TYPES.Application).to(App);
	appContaineer.bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
	appContaineer.bind<IUserController>(TYPES.IUserController).to(UserController);
	appContaineer.bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	appContaineer.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	appContaineer.bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	appContaineer.bind<IJWTService>(TYPES.IJWTService).to(JWTService).inSingletonScope();
	appContaineer
		.bind<IUsersRepository>(TYPES.IUsersRepository)
		.to(UsersRepository)
		.inSingletonScope();
	appContaineer.bind<IPhotosService>(TYPES.IPhotosService).to(PhotosService);
	appContaineer.bind<IPhotosRepository>(TYPES.IPhotosRepository).to(PhotosRepository);
	appContaineer.bind<IPhotosController>(TYPES.IPhotosController).to(PhotosController);
	appContaineer.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
	const app = appContaineer.get<App>(TYPES.Application);
	app.init();
	return app;
}

bootstrap();
