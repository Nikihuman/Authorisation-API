import { inject, injectable } from 'inversify';
import { RegisterDTO } from '../dto/register.dto';
import { User } from '../user.entity';
import { IUsersService } from './users.service.interface';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { IUsersRepository } from '../users.repository/users.repository.interface';
import { UserModel } from '@prisma/client';
import { LoginDTO } from '../dto/login.dto';
import { HttpError } from '../../errors/http-error.class';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private userRepository: IUsersRepository,
	) {}

	async createUser({ email, password, name }: RegisterDTO): Promise<UserModel | HttpError> {
		const isExistedUser = await this.find(email);
		if (isExistedUser instanceof HttpError) {
			const newUser = new User(email, name);
			const salt = this.configService.get('SALT');
			await newUser.setPassword(password, Number(salt));
			return this.userRepository.create(newUser);
		}
		return new HttpError('A user with the same email address already exists', 422, 'email');
	}

	async validateUser({ email, password }: LoginDTO): Promise<UserModel | HttpError> {
		const isExistedUser = await this.find(email);

		if (isExistedUser instanceof HttpError) {
			return isExistedUser;
		}
		const userToValidate = new User(
			isExistedUser.email,
			isExistedUser.name,
			isExistedUser.passwordHash,
		);
		const result = await userToValidate.checkPassword(password);
		if (!result) {
			return new HttpError('Incorret password', 422, 'password');
		}
		return isExistedUser;
	}

	async find(email: string): Promise<UserModel | HttpError> {
		const isExistedUser = await this.userRepository.find(email);
		if (!isExistedUser) {
			return new HttpError('There is no such user with this email address', 422, 'email');
		}
		return isExistedUser;
	}
}
