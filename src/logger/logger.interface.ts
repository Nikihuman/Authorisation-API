export interface ILogger {
	readonly logger: unknown;
	log: (...args: any[]) => void;
	warn: (...args: any[]) => void;
	error: (...args: any[]) => void;
}
