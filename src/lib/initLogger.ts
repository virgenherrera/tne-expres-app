import { TneLogger, ISettings } from '@tne/logger';

export function initLogger(getConfig: Function): TneLogger {
	const format = getConfig('logger.format');
	const level = getConfig('logger.level', 'debug');
	const customTransports = getConfig('logger.customTransports');
	const settings: ISettings = {
		fileCfg: {
			logsPath: getConfig('logger.fileCfg.logsPath'),
			logFile: getConfig('logger.fileCfg.logFile'),
			datePattern: getConfig('logger.fileCfg.datePattern'),
		},
	};

	if (format) {
		settings.format = format;
	}
	if (level) {
		settings.level = level;
	}
	if (customTransports) {
		settings.customTransports = customTransports;
	}

	return new TneLogger(settings);
}
