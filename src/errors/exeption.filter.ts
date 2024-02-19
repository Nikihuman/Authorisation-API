import { inject, injectable } from 'inversify';
import { IExeptionFilter } from './exeption.filter.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from './http-error.class';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			if (err.statusCode >= 500) {
				this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			}
			res.status(err.statusCode).send([{ field: err.context, error_Message: err.message }]);
		} else {
			this.logger.error(err.message);
			res.status(500).send({ err: err.message });
		}
	}
}
