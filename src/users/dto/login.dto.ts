import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';

export class LoginDTO {
	@IsEmail({}, { message: 'Invalid Email' })
	email: string;

	@IsString({ message: 'The password must be a string' })
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
			'The password length must be 8 or more symbols and contain at least two number, two lowercase letter, two uppercase letter, and do not contain spaces',
	})
	password: string;
}
