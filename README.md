# @tne/express-app
A library that encapsulates the Web Application framework `Express.js` and other common middleware tools such as `compression, cors, morgan, serve-favicon` and also the
 `joi` the famous javascript schema validation tool, in order to provide you a base to load easily the resources and services for your web application.

---
<a name="main_menu"></a>
## Menu
### [Installation](#install_instructions)
### [Creating a web service with `@tne/express-app`](./docs/creating_a_service.md)
### [ExpressApplication](#application_interface)
- [construct()](#app_construct)
- [destruct()](#app_destruct)
- [getInstance()](#app_get_instance)
- [getExpressApp()](#app_get_express_app)
### Foundation Libraries
- [Express](#express_js)
- [joi](#joi_js)
### [Decorators](#app_decorators)
- [Config](#decorator_config)
- [FinalClass](#decorator_final_class)
- [Prefix](#decorator_prefix)
- [Endpoint](#decorator_endpoint)
- [ExpressRouter](#decorator_express_router)
### [Interfaces](#app_interfaces)
- [IAppSettings](#i_app_settings)
- [ILoggerSettings](#i_logger_settings)
- [IEndpointConfig](#i_endpoint_config)

---
<a name="install_instructions"></a>
[Back to Menu](#main_menu)
## Installation
You can install through the node package managers:

### NPM
```
$ npm install --save @tne/express-app
```

### Yarn
```
$ yarn add @tne/express-app
```
---
<a name="application_interface"></a>
[Back to Menu](#main_menu)
### ExpressApplication
This Object is an interface that provides us with the methods that will allow you to create, destroy or obtain the instance of our web application.

#### Methods
- [construct()](#app_construct)
- [destruct()](#app_destruct)
- [getInstance()](#app_get_instance)
- [getExpressApp()](#app_get_express_app)

#### Example usage
```
import { ExpressApplication } from '@tne/express-app';
// code here
```

---
<a name="app_construct"></a>
[Back to Menu](#main_menu)
### construct()
This method will build a singleton instance of class [ExpressCoreApplication](./ExpressCoreApplication.md), start the `http` service and return a reference to the built instance.

The method has two overloads:
- string
- IAppSettings

#### String Example
file: `src/index.ts`
```
import { ExpressApplication } from '@tne/express-app';

ExpressApplication.construct(__dirname);
```

#### [IAppSettings](#i_app_settings) Example
file: `src/index.ts`
```
import { ExpressApplication, IAppSettings } from '@tne/express-app';

const config: IAppSettings = {
	appPath: __dirname,
	// ... other IAppSettings here
};

ExpressApplication.construct(config);
```

---
<a name="app_destruct"></a>
[Back to Menu](#main_menu)
### destruct()
This method will stop the http service created by `Express.js` and destroy the singleton instance of the [ExpressCoreApplication](./ExpressCoreApplication.md) class (if they existed).

#### Example
```
import { ExpressApplication } from '@tne/express-app';

ExpressApplication.destruct();
```

---
<a name="app_get_instance"></a>
[Back to Menu](#main_menu)
### getInstance()
This method returns a reference to the singleton instance of class [ExpressCoreApplication](./ExpressCoreApplication.md), if it exists, otherwise it will return `null`.

#### Example
```
import { ExpressApplication } from '@tne/express-app';

const app = ExpressApplication.getInstance();
```

---
<a name="app_get_express_app"></a>
[Back to Menu](#main_menu)
### getExpressApp()
This method returns a reference to the `app` property (which is the `Express.js` application) of the singleton instance of the [ExpressCoreApplication](./ExpressCoreApplication.md) class, if it exists, otherwise it will return `null`.

#### Example
```
import { ExpressApplication } from '@tne/express-app';

const expressApp = ExpressApplication.getExpressApp();
```

---
<a name="express_js"></a>
[Back to Menu](#main_menu)
### Express
There is not much to add, just the [Express.js](https://expressjs.com/en/api.html) library on which this library works, free to use it as you wish.

For example, you can use this export to create a mock Server for your unit tests.

#### Example
```
import { express } from '@tne/express-app';

const app = express();
```

---
<a name="joi_js"></a>
[Back to Menu](#main_menu)
### joi
just the [joi](https://github.com/hapijs/joi) to create amazing schema-based validations.

#### [Example](https://github.com/hapijs/joi#example)
```
import { joi } from '@tne/express-app';

const pager = joi.object().keys({
	page: joi.number().integer().positive().min(1).required(),
	per_page: joi.number().integer().positive().min(1).required(),
});

const { error, value } = joi.validate({ page: 1, per_page: 50 }, pager);
// result.error === null -> valid
```

---
<a name="app_decorators"></a>
[Back to Menu](#main_menu)
### Decorators
This library provides you with some [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) that will help you simplify or extend the functionalities of your web application.

---
<a name="decorator_config"></a>
[Back to Menu](#main_menu)
### @Config
The class decorator `@config` will freeze the decorating class as well as its `prototype`, so that it can not be modified externally.


#### Example
```
import { Config } from '@tne/express-app';

@Config
export class ExampleClass {
	// class that I do not want to modify externally
}
```

---
<a name="decorator_final_class"></a>
[Back to Menu](#main_menu)
### @FinalClass
This "class decorator" transforms the class into a "Final class", so it can not be extended by any other class.


#### Example
```
import { FinalClass } from '@tne/express-app';

@FinalClass
export class SomeFinalClass {
	// class that I do not want to extend
}

export class OtherClass extends SomeFinalClass {
	// code here!
}
```
The above code will throw an error when loading the "OtherClass" class.

---
<a name="decorator_prefix"></a>
[Back to Menu](#main_menu)
### @Prefix
This "property decorator" prefixes the value of the property of the string or property provided in the argument to the decorated property.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
| propToPrefix | string | true | The property that will be prefixed to the property that is being decorated. |

#### Constraints
It only works if all the properties of the decorated class are `static`.

#### Example
```
import { Config, Prefix } from '@tne/express-app';

@Config
export class Routes {
	static baseUrl = '/';
	static apiUrl = '/api/v1/';

	@Prefix('apiUrl')
	static users = '/users/';

	@Prefix('apiUrl')
	static user = '/users/:id/';

	@Prefix('apiUrl')
	static users = '/users/';

	@Prefix('baseUrl')
	static view_users = '/users/:id/';

	@Prefix('baseUrl')
	static view_user = '/users/:id/';
}
```

#### Example output
```
import { Routes } from 'config/route';

console.log(Routes.user) // -> /api/v1/users/:id/;
console.log(Routes.view_user) // -> /users/:id/;
```

---
<a name="decorator_endpoint"></a>
[Back to Menu](#main_menu)
### @Endpoint
This "method decorator" is used in conjunction with `@ExpressRouter` to transform the methods of a class into usable Route handler of `Express.js`.

Your must provide an object that implements the [IEndpointConfig](#i_endpoint_config) Interface as argument.

#### Example
```
import { Endpoint, ExpressRouter } from '@tne/express-app';
import { middlewareFunc } from 'some/path';

@ExpressRouter
export default class ExampleRouter {
	@Endpoint({
		method: 'GET'
		path: '/users'
	})
	getUsers(req,res){
		// GET Route handler code here!
	}

	@Endpoint({
		method: 'POST'
		path: '/users'
	})
	postUsers(req,res){
		// POST Route handler code here!
	}

	@Endpoint({
		method: 'PUT'
		path: '/users/:id',
		middleware: [middlewareFunc]
	})
	putUsers(req,res){
		// PUT Route handler code here!
	}
}
```

---
<a name="decorator_express_router"></a>
[Back to Menu](#main_menu)
### @ExpressRouter
This "class decorator" is used in conjunction with `@Endpoint` to transform the methods of a class into usable Route handlers for 'Express.js'.


#### Example
```
import { Endpoint, ExpressRouter } from '@tne/express-app';
import { middlewareFunc } from 'some/path';

@ExpressRouter
export default class ExampleRouter {
	@Endpoint({
		method: 'GET'
		path: '/users'
	})
	getUsers(req,res){
		// GET Route handler code here!
	}

	@Endpoint({
		method: 'POST'
		path: '/users'
	})
	postUsers(req,res){
		// POST Route handler code here!
	}

	@Endpoint({
		method: 'PUT'
		path: '/users/:id',
		middleware: [middlewareFunc]
	})
	putUsers(req,res){
		// PUT Route handler code here!
	}
}
```

In runtime, above example will behave in the following way:
```
const { Router } = require('express');
const { middlewareFunc } = require('some/path');
const router = Router();

module.exports.default =  router
.get('/users', (req, res) => { /* GET Route handler code here! */ })
.post('/users', (req, res) => { /* POST Route handler code here! */ })
.put('/users/:id', middlewareFunc, (req, res) => { /* PUT Route handler code here! */ })
```

---
<a name="app_interfaces"></a>
[Back to Menu](#main_menu)
### Interfaces
The interfaces that this library provides and that are described here provide help to the developer that will consume this library to build incredible web applications.

#### Constraints
The interfaces mentioned in this section will be importable only if you are developing your web application with `typescript`.

---
<a name="i_app_settings"></a>
[Back to Menu](#main_menu)
### IAppSettings
Used as an argument for the `ExpressApplication.construct` method, and used to create an instance of the class [ExpressCoreApplication](./ExpressCoreApplication.md) with arguments different from those used by default.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
| appPath | string | true | The `__dirname` when using from **src/index.ts** file.. |
| environment | string | false | When provided your app will use this env instead `NODE_ENV`. |
| appName | string | false | Your application name. |
| logger | ILoggerSettings | false | valid [ILoggerSettings](#i_logger_settings) object. |
| locals | any | false | any data that you want push to [`app.locals`](https://expressjs.com/en/api.html#app.locals). |
| port | number | false | The port for tour webApplication; **defaults to 3000**. |
| faviconPath | string | false | Relative path to `favicon`. |
| publicFolder | string | false | Relative path to `Public` folder. |
| defaultPage | number | false | Default Page value for `req.pager` helper. |
| defaultPerPage | number | false | Default Per_Page value for `req.pager` helper. |
| corsOptions | CorsOptions | false | valid [CorsOptions](https://github.com/expressjs/cors#configuration-options) object. |
| compressionOptions | CompressionOptions | false | valid [CompressionOptions](https://github.com/expressjs/compression#readme) object. |
| urlEncodedOptions | OptionsUrlencoded | false | valid [OptionsUrlencoded](https://expressjs.com/en/api.html#express.urlencoded) object. |
| jsonOptions | OptionsJson | false | valid [OptionsJson](https://expressjs.com/en/api.html#express.json) object. |
| appMiddleware | RequestHandler[] | false | A valid [middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application) array that you want to use in your app. |
| routesFolder | string OR string[] | false | Relative path to Route(s) Folder. |
| errorHandler | ErrorRequestHandler | false | valid [ErrorRequestHandler](https://expressjs.com/en/guide/error-handling.html) function. |


---
<a name="i_logger_settings"></a>
[Back to Menu](#main_menu)
### ILoggerSettings
Used to config the Application logger

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
| format | Format | false | valid [winston Format](https://github.com/winstonjs/winston#formats).  |
| fileCfg | IFileSettings | false | valid [IFileSettings](#i_file_settings) object. |
| customTransports | Transport[] | false | array of your own additional [winston Transports](https://github.com/winstonjs/winston#transports) |

---
<a name="i_file_settings"></a>
[Back to Menu](#main_menu)
### IFileSettings
Used to config the Application file logger with daily rotate function.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
| logsPath | string | true | valid Path where logFiles will be placed. |
| logFile | string | false | basename for fileLogs. |
| datePattern | string | false | datePattern for fileLogs, defaults to `YYYYMMDD`.|

---
<a name="i_endpoint_config"></a>
[Back to Menu](#main_menu)
### IEndpointConfig
Interface Used to describe arguments for the method decorator "@Endpoint".

It helps us to transform the decorated method into a useful Route handler for `Express.js`.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
method | string OR string[] | true | Method, list of methods delimited by commas or an array of valid methods for `Express.js`.
path | string | true | Route path valid for `Express.js`.
middleware | RequestHandler[] | false | A valid middleware array that you want to prefix to your `Express.js` Route handler.
