import { APP_DEFAULTS } from './constant/config';
import { buildExpressApp } from './lib/expressApp';
import { IAppConfig, IExpressCoreApplication } from './interfaces';
import { NodeJsApp } from '@tne/nodejs-app';
import { startServer, stopServer } from './lib/httpService';

export class ExpressCoreApplication extends NodeJsApp implements IExpressCoreApplication {
	public app = null;
	public server = null;

	constructor(settings: string | IAppConfig) {
		super(settings, APP_DEFAULTS);

		this.app = buildExpressApp(this.getConfig, this.logger);
		this.server = startServer(this.app, this.getConfig, this.logger);
	}

	get appPort() {
		return this.app.settings.port;
	}

	get appLocals() {
		return this.app.locals;
	}

	public async stopServer() {
		this.server = await stopServer(this.server, this.settings, this.logger);
		this.app = null;

		return this;
	}
}
