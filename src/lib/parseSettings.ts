import { join } from 'path';
import { pathExists, loadJsonFile, toCamelCase } from '@tne/common';
import { APP_DEFAULTS, Defaults } from '../constant/config';
import { IAppSettings } from '../interface';
import { ISettings as ILogSettings, IFileSettings } from '@tne/logger';
import { getConfig } from './getConfig';
import { Exceptions } from '../constant/Exceptions';

export function parseSettings(args: IAppSettings | string): IAppSettings {
	let data: IAppSettings;

	// Parse args get Env and appName
	const settings = bundleSettings(args);
	const appName = setAppName(settings.appName);

	// Ensure appPath was provided and leads to valid path
	ensureAppPath(settings.appPath);

	// Ensure configPath was provided and leads to valid path
	const configPath = parseConfigPath(settings.appPath);

	// Ensure configPath/:NODE_ENV.json file exists and is a valid json
	const config = getJsonFileEnvData(configPath, settings.environment);

	// try to load configPath/keys.json or assign {}
	const keys = { keys: getJsonFileKeysData(configPath) };

	// ParseLogger Config
	const logger = setLoggerCfg(settings);

	// Bundle settings
	data = { ...settings, appName, configPath, logger, ...config, keys };

	// Freeze AppSettings
	Object.freeze(data);

	return data;
}

function bundleSettings(args: IAppSettings | string): IAppSettings {
	let res: IAppSettings;

	if (typeof args === 'object' && !Array.isArray(args) && args.hasOwnProperty('appPath') && typeof args.appPath === 'string') {
		res = <IAppSettings>{ ...APP_DEFAULTS, ...args };
	} else {
		console.error(Exceptions.constructorArgs);
		throw new Error(Exceptions.constructorArgs);
	}

	return res;
}

function setAppName(appName: string): string {
	return toCamelCase(appName);
}

function ensureAppPath(appPath: string = null): void {
	if (!pathExists(appPath)) {
		console.error(Exceptions.appPathExist);
		throw new Error(Exceptions.appPathExist);
	}
}

function parseConfigPath(appPath: string): string {
	const configPath = join(appPath, Defaults.configFolder);

	if (!pathExists(configPath)) {
		const msg = Exceptions.configPath + '\n' + Exceptions.appPathInterpolation.replace(':path', configPath);
		console.error(msg);
		throw new Error(msg);
	}

	return configPath;
}

function getJsonFileEnvData(configPath: string, env: string): any {
	const configFilePath = join(configPath, `${env}.json`);

	try {
		return loadJsonFile(configFilePath);
	} catch (E) {
		console.error(E);
		throw E;
	}
}

function getJsonFileKeysData(configPath: string): any {
	const keysFilePath = join(configPath, 'keys.json');

	try {
		return loadJsonFile(keysFilePath);
	} catch  {
		return {};
	}
}

function setLoggerCfg(settings: IAppSettings): ILogSettings {
	const { appPath, appName } = settings;

	let logsPath = getConfig(settings, 'logger.fileCfg.logsPath', '');
	logsPath = pathExists(logsPath) ? logsPath : join(appPath, Defaults.logsFolder);

	const logFile = getConfig(settings, 'logger.fileCfg.logFile', appName);
	const datePattern = getConfig(settings, 'logger.fileCfg.datePattern');

	const fileCfg: IFileSettings = { logsPath, logFile, datePattern };
	const logConfig: ILogSettings = { fileCfg };

	if (settings.logger && settings.logger.format) {
		logConfig.format = settings.logger.format;
	}
	if (settings.logger && settings.logger.level) {
		logConfig.level = settings.logger.level;
	}
	if (settings.logger && settings.logger.customTransports) {
		logConfig.customTransports = settings.logger.customTransports;
	}

	return logConfig;
}
