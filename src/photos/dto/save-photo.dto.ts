import { IsString, IsNumber, MinLength } from 'class-validator';

export class SavePhotoDTO {
	@IsString({ message: `The 'smallUrl' must be a string` })
	@MinLength(2, {
		message: `The field 'smallUrl' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	smallUrl: string;
	@IsString({ message: `The 'rawUrl' must be a string` })
	@MinLength(2, {
		message: `The field 'rawUrl' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	rawUrl: string;
	@IsString({ message: `The 'fullUrl' must be a string` })
	@MinLength(2, {
		message: `The field 'fullUrl' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	fullUrl: string;
	@IsString({ message: `The 'photoId' must be a string` })
	@MinLength(2, {
		message: `The field 'photoId' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	photoId: string;
	@IsString({ message: `The 'username' must be a string` })
	@MinLength(2, {
		message: `The field 'username' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	username: string;
	@IsString({ message: `The 'location' must be a string` })
	@MinLength(1, {
		message: `The field 'location' must be a string, and the length of the 'name' field must be 1 or more characters`,
	})
	location: string;
	@IsNumber({}, { message: `The 'width' must be a number` })
	width: number;
	@IsNumber({}, { message: `The 'height' must be a number` })
	height: number;
}
