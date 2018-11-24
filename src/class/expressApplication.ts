import { Server } from 'http';
import { Application } from 'express';
import { APP_DEFAULTS } from '../constant/config';
import { buildExpressApp } from '../lib/expressApp';
import { IAppSettings } from '../interface';
import { NodeJsApp } from '@tne/nodejs-app';
import { startServer, stopServer } from '../lib/httpService';
import { Exceptions } from '../constant/Exceptions';

let _instance: ExpressApplication = null;

export class ExpressApplication extends NodeJsApp {
	public app: Application = null;
	public server: Server = null;

	get appLocals(): any {
		return this.app.locals;
	}

	constructor(settings: IAppSettings | string) {
		super(settings, APP_DEFAULTS);

		this.app = buildExpressApp(this.getConfig, this.logger);
		this.server = startServer(this.app, this.getConfig, this.logger);
	}

	public static construct: (args: string | IAppSettings) => ExpressApplication = (settings) => {
		if (_instance === null) {
			_instance = new ExpressApplication(settings);
		} else {
			_instance.logger.warn(Exceptions.instanceRunning);
		}

		return _instance;
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

	public async stopServer(): Promise<this> {
		const { app, server } = await stopServer(this.server, this.settings, this.logger);

		this.app = app;
		this.server = server;

		return this;
	}
}
