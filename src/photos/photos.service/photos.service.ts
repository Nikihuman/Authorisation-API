import { inject, injectable } from 'inversify';
import { IPhotosService } from './photos.service.interface';
import { HttpError } from '../../errors/http-error.class';
import { GetPhotoDTO } from '../dto/get-photo.dto';
import { SavePhotoDTO } from '../dto/save-photo.dto';
import { PhotoModel, UserModel } from '@prisma/client';
import { TYPES } from '../../types';
import { IPhotosRepository } from '../photos.repository/photos.repository.interface';
import { Photo } from '../photo.entity';
import { RemovePhotoDTO } from '../dto/remove-photo.dto';
import { IUsersService } from '../../users/users.service/users.service.interface';

@injectable()
export class PhotosService implements IPhotosService {
	constructor(
		@inject(TYPES.IPhotosRepository) private readonly photosRepository: IPhotosRepository,
		@inject(TYPES.IUsersService) private readonly userService: IUsersService,
	) {}
	async addPhoto(dto: SavePhotoDTO, email: string): Promise<PhotoModel | HttpError> {
		const isExistedUser = await this.findUser(email);
		if (isExistedUser instanceof HttpError) {
			return isExistedUser;
		}
		const isExistedPhoto = await this.photosRepository.findPhoto(dto.photoId, email);
		if (isExistedPhoto) {
			return new HttpError('You already have such photo', 400, 'photo');
		}
		const photo = new Photo(dto, email);
		return this.photosRepository.addPhoto(photo);
	}
	async findPhoto(dto: GetPhotoDTO, email: string): Promise<PhotoModel | HttpError> {
		const isExistedUser = await this.findUser(email);
		if (isExistedUser instanceof HttpError) {
			return isExistedUser;
		}
		const isExistedPhoto = await this.photosRepository.findPhoto(dto.photoId, email);
		if (!isExistedPhoto) {
			return new HttpError('You dont have such photo', 400, 'photo');
		}
		return isExistedPhoto;
	}
	async getUserPhotos(email: string): Promise<PhotoModel[] | HttpError> {
		const isExistedUser = await this.findUser(email);
		if (isExistedUser instanceof HttpError) {
			return isExistedUser;
		}
		const photos = await this.photosRepository.getUserPhotos(email);
		if (!photos || photos.length < 1) {
			return new HttpError('You dont have any photos', 400, 'photo');
		}
		return photos;
	}
	async removePhoto(dto: RemovePhotoDTO, email: string): Promise<true | HttpError> {
		const isExistedUser = await this.findUser(email);
		if (isExistedUser instanceof HttpError) {
			return isExistedUser;
		}
		const res = await this.photosRepository.remove(dto.id, email);
		if (!res) {
			return new HttpError("You haven't such photo", 400, 'photo');
		}
		return true;
	}
	async findUser(email: string): Promise<UserModel | HttpError> {
		const isExistedUser = await this.userService.find(email);
		if (isExistedUser instanceof HttpError) {
			return new HttpError('Wrong email address', 400, 'authorization');
		}
		return isExistedUser;
	}
}
