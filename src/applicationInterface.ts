import { Application } from 'express';
import { ExpressCoreApplication } from './expressCoreApplication';
import { IAppConfig } from './interfaces';
import { Exceptions } from './constant/Exceptions';

let _instance: ExpressCoreApplication = null;

export class ApplicationInterface {
	public static construct: (args: string | IAppConfig) => ExpressCoreApplication = (settings) => {
		if (_instance === null) {
			_instance = new ExpressCoreApplication(settings);
		} else {
			_instance.logger.warn(Exceptions.instanceRunning);
		}

		return ApplicationInterface.getInstance();
	}

	public static destruct: () => void = () => {
		if (_instance !== null) {
			_instance.stopServer();
		}

		_instance = null;
	}

	public static getInstance: () => ExpressCoreApplication = () => {
		return _instance;
	}

	public static getExpressApp: () => Application = () => {
		return (_instance !== null)
			? _instance.app
			: null;
	}
}
