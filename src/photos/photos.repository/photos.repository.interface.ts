import { PhotoModel } from '@prisma/client';
import { Photo } from '../photo.entity';

export interface IPhotosRepository {
	addPhoto: (photo: Photo) => Promise<PhotoModel>;
	findPhoto: (id: string, email: string) => Promise<PhotoModel | null>;
	getUserPhotos: (email: string) => Promise<PhotoModel[] | null>;
	remove: (id: number, email: string) => Promise<boolean>;
}
