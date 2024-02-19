import { sign, verify } from 'jsonwebtoken';
import { IJWTPayload, IJWTService } from './jwt.service.interface';
import { injectable } from 'inversify';
import { HttpError } from '../errors/http-error.class';

@injectable()
export class JWTService implements IJWTService {
	singJWT(email: string, name: string, secret: string): Promise<string | HttpError> {
		return new Promise<string | HttpError>((resolve, reject) => {
			sign(
				{
					email,
					name,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, encoded) => {
					if (typeof encoded === 'string') {
						resolve(encoded);
					}
					reject(err);
				},
			);
		}).catch((err) => {
			if (err instanceof Error) {
				return new HttpError(err.message, 401);
			}
			return new HttpError('An error occurred during signing JWT', 500, 'authorization');
		});
	}
	async verifyJWT(jwt: string, secret: string): Promise<IJWTPayload | HttpError> {
		return new Promise<IJWTPayload | HttpError>((resolve, reject) => {
			verify(jwt, secret, (err, decoded) => {
				if (err || typeof decoded === 'string' || !decoded) {
					reject(new HttpError('Invalid Access Token', 401, 'authorization'));
					return;
				}
				resolve({ email: decoded.email, name: decoded.name, iat: decoded.iat });
			});
		}).catch((err) => {
			return err;
		});
	}
}
