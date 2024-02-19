import { inject, injectable } from 'inversify';
import { IPhotosRepository } from './photos.repository.interface';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { Photo } from '../photo.entity';
import { PhotoModel } from '@prisma/client';
@injectable()
export class PhotosRepository implements IPhotosRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async addPhoto(photo: Photo): Promise<PhotoModel> {
		return this.prismaService.client.photoModel.create({
			data: {
				...photo,
			},
		});
	}
	async findPhoto(id: string, email: string): Promise<PhotoModel | null> {
		return this.prismaService.client.photoModel.findFirst({
			where: { photoId: id, userEmail: email },
		});
	}
	async getUserPhotos(email: string): Promise<PhotoModel[] | null> {
		return this.prismaService.client.photoModel.findMany({ where: { userEmail: email } });
	}
	async remove(id: number, email: string): Promise<boolean> {
		const res = await this.prismaService.client.photoModel.delete({
			where: {
				id,
				userEmail: email,
			},
		});
		return res ? true : false;
	}
}
