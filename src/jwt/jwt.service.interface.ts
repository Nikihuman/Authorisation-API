import { JwtPayload } from 'jsonwebtoken';
import { HttpError } from '../errors/http-error.class';

export interface IJWTPayload extends JwtPayload {
	email: string;
	name: string;
	iat?: number;
}

export interface IJWTService {
	singJWT: (email: string, name: string, secret: string) => Promise<string | HttpError>;
	verifyJWT: (jwt: string, secret: string) => Promise<HttpError | IJWTPayload>;
}
