import { hash, compare } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly passwordHash?: string,
	) {}

	get email(): string {
		return this._email;
	}
	get name(): string {
		return this._name;
	}
	get password(): string {
		return this._password;
	}

	public async setPassword(password: string, salt: number): Promise<void> {
		this._password = await hash(password, salt);
	}

	public async checkPassword(checkablePpassword: string): Promise<boolean> {
		if (this.passwordHash) {
			return compare(checkablePpassword, this.passwordHash);
		}
		return false;
	}
}
