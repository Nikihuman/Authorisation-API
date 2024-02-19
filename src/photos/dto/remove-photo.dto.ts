import { IsNumber } from 'class-validator';

export class RemovePhotoDTO {
	@IsNumber({}, { message: 'The imageId must be a string' })
	id: number;
}
