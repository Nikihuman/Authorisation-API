import { UserModel } from '@prisma/client';
import { RegisterDTO } from '../dto/register.dto';
import { HttpError } from '../../errors/http-error.class';
import { LoginDTO } from '../dto/login.dto';

export interface IUsersService {
	createUser: (dto: RegisterDTO) => Promise<UserModel | HttpError>;
	validateUser: (dto: LoginDTO) => Promise<UserModel | HttpError>;
	find: (email: string) => Promise<UserModel | HttpError>;
}
