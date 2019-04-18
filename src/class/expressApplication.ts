import { Exceptions } from '../constant/Exceptions';
import { IAppSettings } from '../interface';
import { AppCore } from './appCore';
import { appType } from '../interface/types';
import { Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';

let _instance: ExpressApplication = null;

export class ExpressApplication extends AppCore {
	public static construct: (args: IAppSettings) => ExpressApplication = (settings) => {
		if (_instance === null) {
			_instance = new ExpressApplication(settings);
		} else {
			_instance.logger.warning(Exceptions.instanceRunning);
		}

		return _instance;
	}

	public static destruct: () => Promise<void> = async () => {
		if (_instance !== null) {
			await _instance.stopServer();
		}

		_instance = null;
	}

	public static getInstance: () => ExpressApplication = () => {
		return _instance;
	}

	public static getExpressApp: () => appType = () => {
		return (_instance !== null)
			? _instance.app
			: null;
	}

	public static getServer: () => httpServer | httpsServer = () => {
		return (_instance !== null)
			? _instance.server
			: null;
	}
}
