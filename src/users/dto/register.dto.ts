import { IsEmail, IsString, IsStrongPassword, MinLength, Matches } from 'class-validator';

export class RegisterDTO {
	@IsEmail({}, { message: 'Invalid Email' })
	email: string;

	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 2,
			minNumbers: 2,
			minSymbols: 0,
			minUppercase: 2,
		},
		{
			message:
				'The password length must be 8 or more symbols and contain at least two number, two lowercase letter, two uppercase letter, and do not contain spaces',
		},
	)
	@Matches(/^[^\s]*$/, {
		message:
			'The password length must be 8 or more symbols and contain at least two number, two lowercase letter, two uppercase letter, and do not contain spaces`',
	})
	password: string;
	@MinLength(2, {
		message: `The field 'name' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	@IsString({
		message: `The field 'name' must be a string, and the length of the 'name' field must be 2 or more characters`,
	})
	name: string;
}
