import { Container, ContainerModule, interfaces } from 'inversify';
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

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appUserBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
});

export const appPhotoBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IPhotosController>(TYPES.IPhotosController).to(PhotosController);
	bind<IPhotosService>(TYPES.IPhotosService).to(PhotosService);
	bind<IPhotosRepository>(TYPES.IPhotosRepository).to(PhotosRepository);
});
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IJWTService>(TYPES.IJWTService).to(JWTService).inSingletonScope();
	bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();
});

export function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.bind<App>(TYPES.Application).to(App);
	appContainer.load(appBindings);
	appContainer.load(appUserBindings);
	appContainer.load(appPhotoBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

bootstrap();
