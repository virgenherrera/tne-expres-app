export const appPath = __dirname;

export const locals = {
	config1: 'value1',
	config2: 'value2',
	config3: 'value3',
	config4: 'value4',
	config5: 'value5',
};

export const baseAppSettings = {
	appPath,
	locals,
};

export const publicPathAppSettings = {
	appPath,
	publicFolder: '../public'
};

export const faviconAppSettings = {
	appPath,
	faviconPath: '../public/favicon.ico',
};

export const routedApp = {
	appPath,
	routesFolder: './routes',
	corsOptions: 'default',
	compressionOptions: 'default',
	urlEncodedOptions: 'default',
	jsonOptions: 'default',
};

export const routedAppBadRoutesFolder = {
	appPath,
	routesFolder: './nonExistentRoutesFolder'
};

export const manyRoutesFolderApp = {
	appPath,
	routesFolder: ['./routes', './routes', './routes']
};
