import { SavePhotoDTO } from './dto/save-photo.dto';

export class Photo {
	readonly smallUrl: string;
	readonly rawUrl: string;
	readonly fullUrl: string;
	readonly photoId: string;
	readonly username: string;
	readonly location: string;
	readonly width: number;
	readonly height: number;
	readonly userEmail: string;
	constructor(dto: SavePhotoDTO, email: string) {
		(this.smallUrl = dto.smallUrl),
			(this.rawUrl = dto.rawUrl),
			(this.fullUrl = dto.fullUrl),
			(this.photoId = dto.photoId),
			(this.username = dto.username),
			(this.location = dto.location),
			(this.width = dto.width),
			(this.height = dto.height),
			(this.userEmail = email);
	}
}
