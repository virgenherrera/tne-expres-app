import { Application } from 'express';
import { ExpressApplication } from '../class/expressApplication';
import { IAppConfig } from '../interface';
import { Exceptions } from '../constant/Exceptions';

let _instance: ExpressApplication = null;

export class ApplicationInterface {
	public static construct: (args: string | IAppConfig) => ExpressApplication = (settings) => {
		if (_instance === null) {
			_instance = new ExpressApplication(settings);
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

	public static getInstance: () => ExpressApplication = () => {
		return _instance;
	}

	public static getExpressApp: () => Application = () => {
		return (_instance !== null)
			? _instance.app
			: null;
	}
}
