import { APP_DEFAULTS } from '../constant/config';
import { buildExpressApp } from '../lib/expressApp';
import { IAppConfig, IExpressCoreApplication } from '../interface';
import { NodeJsApp } from '@tne/nodejs-app';
import { startServer, stopServer } from '../lib/httpService';

export class ExpressApplication extends NodeJsApp implements IExpressCoreApplication {
	public app = null;
	public server = null;

	constructor(settings: string | IAppConfig) {
		super(settings, APP_DEFAULTS);

		this.app = buildExpressApp(this.getConfig, this.logger);
		this.server = startServer(this.app, this.getConfig, this.logger);
	}

	get appLocals() {
		return this.app.locals;
	}

	public async stopServer() {
		const { app, server } = await stopServer(this.server, this.settings, this.logger);

		this.app = app;
		this.server = server;

		return this;
	}
}
