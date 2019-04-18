import { TneLogger, ILoggerOpts } from '@tne/logger';

export function initLogger(getConfig: Function): TneLogger {
	const format = getConfig('logger.format');
	const customTransports = getConfig('logger.customTransports');
	const settings: ILoggerOpts = {
		fileCfg: {
			logsPath: getConfig('logger.fileCfg.logsPath'),
			logFile: getConfig('logger.fileCfg.logFile'),
			datePattern: getConfig('logger.fileCfg.datePattern'),
		},
	};

	if (format) {
		settings.format = format;
	}
	if (customTransports) {
		settings.customTransports = customTransports;
	}

	return new TneLogger(settings);
}
