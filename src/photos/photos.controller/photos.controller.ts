import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { IPhotosController } from './photos.controller.interface';
import { TYPES } from '../../types';
import { IPhotosService } from '../photos.service/photos.service.interface';
import { Request, Response, NextFunction } from 'express';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { GetUserPhotosDTO } from '../dto/get-user-photos.dto';
import { SavePhotoDTO } from '../dto/save-photo.dto';
import { GetPhotoDTO } from '../dto/get-photo.dto';
import { ILogger } from '../../logger/logger.interface';
import { HttpError } from '../../errors/http-error.class';
import { RemovePhotoDTO } from '../dto/remove-photo.dto';
@injectable()
export class PhotosController extends BaseController implements IPhotosController {
	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.IPhotosService) private photosService: IPhotosService,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/get',
				func: this.getPhoto,
				method: 'post',
				middlewares: [new ValidateMiddleware(GetPhotoDTO)],
			},
			{
				path: '/save',
				func: this.savePhoto,
				method: 'post',
				middlewares: [new ValidateMiddleware(SavePhotoDTO)],
			},
			{
				path: '/getAll',
				func: this.getAllPhotos,
				method: 'post',
				middlewares: [new ValidateMiddleware(GetUserPhotosDTO)],
			},
			{
				path: '/remove',
				func: this.remove,
				method: 'post',
				middlewares: [new ValidateMiddleware(RemovePhotoDTO)],
			},
		]);
	}
	async getPhoto(
		{ body, email }: Request<{}, {}, GetPhotoDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.photosService.findPhoto(body, email);
		if (result instanceof HttpError) {
			return next(result);
		}
		this.ok(res, { message: 'Success', result });
	}
	async savePhoto(
		{ body, email }: Request<{}, {}, SavePhotoDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.photosService.addPhoto(body, email);
		if (result instanceof HttpError) {
			return next(result);
		}
		this.ok(res, { message: 'Success', photo: result });
	}
	async getAllPhotos(
		{ body, email }: Request<{}, {}, GetUserPhotosDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const results = await this.photosService.getUserPhotos(email);
		if (results instanceof HttpError) {
			return next(results);
		}
		this.ok(res, { message: 'Success', results });
	}
	async remove(
		{ body, email }: Request<{}, {}, RemovePhotoDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const results = await this.photosService.removePhoto(body, email);
		if (results instanceof HttpError) {
			return next(results);
		}
		this.ok(res, { message: 'Success' });
	}
}
