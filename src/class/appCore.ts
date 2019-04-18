import { Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';
import { URL } from 'url';
import { TneLogger } from '@tne/logger';
import { buildExpressApp } from '../lib/buildExpressApp';
import { concatUri } from '../lib/concatUri';
import { getConfig } from '../lib/getConfig';
import { appType, IAppSettings } from '../interface';
import { initLogger } from '../lib/initLogger';
import { parseSettings } from '../lib/parseSettings';
import { start as startServer, stop as stopServer } from '../lib/service';

export class AppCore {
	private _logger: TneLogger;
	private settings: IAppSettings = null;
	app: appType = null;
	server: httpServer | httpsServer = null;
	getConfig: (path: string, defaultValue?: any) => any = (path, defaultValue) => getConfig(this.settings, path, defaultValue);

	constructor(args: IAppSettings) {
		this.settings = parseSettings(args);
		this._logger = initLogger(this.getConfig);
		this.app = buildExpressApp(this.settings, this.getConfig, this.logger);
		this.server = startServer(this.app, this.getConfig, this.logger);
	}

	get appLocals(): any {
		return this.app.locals;
	}

	get logger() {
		return this._logger;
	}

	get logsPath(): string {
		return this._logger.settings.fileCfg.logsPath;
	}

	buildUrl(...segments: string[]): string {
		const protocol = this.getConfig('httpsOptions') ? 'https' : 'http';
		const hostname = this.getConfig('hostname', 'localhost');
		const port = this.getConfig('port');
		const serviceUrl = new URL(`${protocol}://${hostname}`);

		if (parseInt(port, 10) !== 80) {
			serviceUrl.port = `${port}`;
		}

		return concatUri(serviceUrl.href, ...segments);
	}

	async stopServer(): Promise<this> {
		await stopServer(this);

		return this;
	}
}
