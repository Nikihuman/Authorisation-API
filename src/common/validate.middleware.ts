import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	async execute(
		{ body }: Request,
		res: Response<any, Record<string, any>>,
		next: NextFunction,
	): Promise<void> {
		const instanse = plainToClass(this.classToValidate, body);
		const errors = await validate(instanse);
		if (errors.length > 0) {
			const errMesages = errors.map((el) => {
				return {
					field: el.property,
					error_Message: el.constraints
						? el.constraints[Object.keys(el.constraints)[0]]
						: [`Error in field ${el.property}`],
				};
			});
			res.status(422).send(errMesages);
		} else {
			next();
		}
	}
}
