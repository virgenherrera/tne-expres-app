import { Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';
import { Application } from 'express';
import { APP_DEFAULTS } from '../constant/config';
import { buildExpressApp } from '../lib/expressApp';
import { IAppSettings } from '../interface';
import { NodeJsApp } from '@tne/nodejs-app';
import { start as startServer, stop as stopServer } from '../lib/service';
import { Exceptions } from '../constant/Exceptions';
import { concatUri } from '../lib/concatUri';
import { URL } from 'url';

let _instance: ExpressApplication = null;

export class ExpressApplication extends NodeJsApp {
	public app: Application = null;
	public server: httpServer | httpsServer = null;

	get appLocals(): any {
		return (this.app) ? this.app.locals : null;
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

	public static destruct: () => Promise<void> = async () => {
		if (_instance !== null) {
			await _instance.stopServer();
		}

		_instance = null;
	}

	public static get instance(): ExpressApplication {
		return _instance;
	}

	public static getInstance: () => ExpressApplication = () => {
		return _instance;
	}

	public static getExpressApp: () => Application = () => {
		return (_instance !== null)
			? _instance.app
			: null;
	}

	public buildUrl(...segments: string[]): string {
		const protocol = this.getConfig('httpsOptions') ? 'https' : 'http';
		const hostname = this.getConfig('hostname', 'localhost');
		const port = this.getConfig('port');
		const serviceUrl = new URL(`${protocol}://${hostname}`);

		if (parseInt(port, 10) !== 80) {
			serviceUrl.port = `${port}`;
		}

		return concatUri(serviceUrl.href, ...segments);
	}

	public async stopServer(): Promise<this> {
		await stopServer(this);

		return this;
	}
}
