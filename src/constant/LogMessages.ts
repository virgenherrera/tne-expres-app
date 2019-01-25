export enum LogMessages {
	expAppInitExpressApp = 'Creating a new Express Application',
	expAppSetAppPort = 'Setting App Port to ":port"',
	expAppSetAppLocals = 'Setting App locals',
	expAppSetAppViews = 'Setting App ":engine" as App Views engine and ":path" as App Views path',
	expAppSetupAppMiddleware = 'Setting App-level middleware',
	expAppSetupAppPublic = 'Setting App Public folder from: ":path"',
	expAppSetupSppFavicon = 'Setting App favicon from path: ":path"',
	setExpAppRoutersDetected = 'Loading ":num" directories of routes, according to the indicated in the file config/:env.json',
	setExpAppRouters = 'Setting up App routers from path: ":path"',
	setExpAppRoute = 'Binding router: ":route" to App',
	setExpAppRoutersEnd = 'It finished the loading of routes continuing the loading of the system.',
	setExpAppErrorHandler = 'Setting up App error handler',
	createHttpServer = 'Launching httpService at port ":port"',
	createHttpsServer = 'Launching https Service at port ":port"',
	haltingHttpServer = 'The process to stop the port service has started: ":port"',
	httpServerHalted = 'Service on port: ":port" now is Halted',
	httpServerListening = ':protocol Server running and is accepting requests on port: ":port"',
}
