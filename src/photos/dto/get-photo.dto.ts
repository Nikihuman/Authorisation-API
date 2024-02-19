import { IsString } from 'class-validator';

export class GetPhotoDTO {
	@IsString({ message: 'The imageId must be a string' })
	photoId: string;
}
