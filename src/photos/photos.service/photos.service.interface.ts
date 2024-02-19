import { PhotoModel } from '@prisma/client';
import { SavePhotoDTO } from '../dto/save-photo.dto';
import { HttpError } from '../../errors/http-error.class';
import { GetPhotoDTO } from '../dto/get-photo.dto';
import { GetUserPhotosDTO } from '../dto/get-user-photos.dto';
import { RemovePhotoDTO } from '../dto/remove-photo.dto';

export interface IPhotosService {
	addPhoto: (dto: SavePhotoDTO, email: string) => Promise<PhotoModel | HttpError>;
	findPhoto: (dto: GetPhotoDTO, email: string) => Promise<PhotoModel | HttpError>;
	getUserPhotos: (email: string) => Promise<PhotoModel[] | HttpError>;
	removePhoto: (dto: RemovePhotoDTO, email: string) => Promise<true | HttpError>;
}
