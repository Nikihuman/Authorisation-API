import { injectable } from 'inversify';
import { ILogger } from './logger.interface';
import { Logger, ILogObj } from 'tslog';

@injectable()
export class LoggerService implements ILogger {
	private _logger: Logger<ILogObj>;
	constructor() {
		this._logger = new Logger({
			type: 'pretty',
			hideLogPositionForProduction: true,
			prettyLogTimeZone: 'local',
		});
	}

	get logger(): Logger<ILogObj> {
		return this._logger;
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
