import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error || !result.parsed) {
			this.logger.error('[ConfigService] Failed to read file .env or he is missing');
		} else {
			this.logger.log('[ConfigService] Config .env loaded');
			this.config = result.parsed;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
