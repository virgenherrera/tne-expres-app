# @tne/express-app
A library that provides an interface and some tools to work with express applications through different environments.

---
<a name="main_menu"></a>
## Menu
### [Installation](#install_instructions)
### [ApplicationInterface](#application_interface)
- [construct()](#app_construct)
- [destruct()](#app_destruct)
- [getInstance()](#app_get_instance)
- [getExpressApp()](#app_get_express_app)
### Base Libraries
- [Express](#express_js)
### [Decorators](#app_decorators)
- [config](#decorator_config)
- [endpoint](#decorator_endpoint)
- [expressRouter](#decorator_express_router)
- [final](#decorator_final)
- [prefix](#decorator_prefix)
### [Interfaces](#app_interfaces)
- [IAppConfig](#i_app_config)
- [IEndpointConfig](#i_endpoint_config)

---
<a name="install_instructions"></a>
[Back to Menu](#main_menu)
## Installation
You can install through the node package managers:

### NPM installation
```
$ npm install --save @tne/express-app
```

### Yarn Install
```
$ yarn add @tne/express-app
```
---
<a name="application_interface"></a>
[Back to Menu](#main_menu)
### ApplicationInterface
This Object is an interface that provides us with the methods that will allow you to create, destroy or obtain the instance of our web application.

#### Methods
- [construct()](#app_construct)
- [destruct()](#app_destruct)
- [getInstance()](#app_get_instance)
- [getExpressApp()](#app_get_express_app)

#### Example usage
```
import { ApplicationInterface } from '@tne/express-app';
// code here
```

---
<a name="app_construct"></a>
[Back to Menu](#main_menu)
### construct()
This method will build a singleton instance of class [ExpressCoreApplication](./ExpressCoreApplication.md), start the `http` service and return a reference to the built instance.

The method has two overloads:
- string of characters
- IAppConfig

#### String Example
file: `src/index.ts`
```
import { ApplicationInterface } from '@tne/express-app';

ApplicationInterface.construct(__dirname);
```

#### [IAppConfig](#i_app_config) Example
file: `src/index.ts`
```
import { ApplicationInterface, IAppConfig } from '@tne/express-app';

const config: IAppConfig = {
	appPath: __dirname,
	// ... other IAppConfig's here
};

ApplicationInterface.construct(config);
```

---
<a name="app_destruct"></a>
[Back to Menu](#main_menu)
### destruct()
This method will stop the http service created by `Express.js` and destroy the singleton instance of the [ExpressCoreApplication](./ExpressCoreApplication.md) class (if they existed).

#### Example
```
import { ApplicationInterface } from '@tne/express-app';

ApplicationInterface.destruct();
```

---
<a name="app_get_instance"></a>
[Back to Menu](#main_menu)
### getInstance()
This method returns a reference to the singleton instance of class [ExpressCoreApplication](./ExpressCoreApplication.md), if it exists, otherwise it will return `null`.

#### Example
```
import { ApplicationInterface } from '@tne/express-app';

const app = ApplicationInterface.getInstance();
```

---
<a name="app_get_express_app"></a>
[Back to Menu](#main_menu)
### getExpressApp()
This method returns a reference to the `app` property (which is the `Express.js` application) of the singleton instance of the [ExpressCoreApplication](./ExpressCoreApplication.md) class, if it exists, otherwise it will return `null`.

#### Example
```
import { ApplicationInterface } from '@tne/express-app';

const expressApp = ApplicationInterface.getExpressApp();
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
<a name="app_decorators"></a>
[Back to Menu](#main_menu)
### Decorators
This library provides you with some [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) that will help you simplify or extend the functionalities of your web application.

---
<a name="decorator_config"></a>
[Back to Menu](#main_menu)
### @config
The class decorator `@config` will freeze the decorating class as well as its `prototype`, so that it can not be modified externally.


#### Example
```
import { config } from '@tne/express-app';

@config
export class ExampleClass {
	// class that I do not want to modify externally
}
```

---
<a name="decorator_endpoint"></a>
[Back to Menu](#main_menu)
### @endpoint
This "method decorator" is used in conjunction with `@expressRouter` to transform the methods of a class into usable Route handler of `Express.js`.

Your must provide an object that implements the [IEndpointConfig](#i_endpoint_config) Interface as argument.

#### Example
```
import { endpoint, expressRouter } from '@tne/express-app';
import { middlewareFunc } from 'some/path';

@expressRouter
export default class ExampleRouter {
	@endpoint({
		method: 'GET'
		path: '/users'
	})
	getUsers(req,res){
		// GET Route handler code here!
	}

	@endpoint({
		method: 'POST'
		path: '/users'
	})
	postUsers(req,res){
		// POST Route handler code here!
	}

	@endpoint({
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
### @expressRouter
This "class decorator" is used in conjunction with `@endpoint` to transform the methods of a class into usable Route handlers for 'Express.js'.


#### Example
```
import { endpoint, expressRouter } from '@tne/express-app';
import { middlewareFunc } from 'some/path';

@expressRouter
export default class ExampleRouter {
	@endpoint({
		method: 'GET'
		path: '/users'
	})
	getUsers(req,res){
		// GET Route handler code here!
	}

	@endpoint({
		method: 'POST'
		path: '/users'
	})
	postUsers(req,res){
		// POST Route handler code here!
	}

	@endpoint({
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
<a name="decorator_final"></a>
[Back to Menu](#main_menu)
### @final
This "class decorator" transforms the class into a "Final class", so it can not be extended by any other class.


#### Example
```
import { final } from '@tne/express-app';

@final
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
### @prefix
This "property decorator" prefixes the value of the property of the string or property provided in the argument to the decorated property.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
The property or `String` that will be prefixed to the property that is being decorated.

#### Constraints
It only works if all the properties of the class are `static`.

#### Example
```
import { config, prefix } from '@tne/express-app';

@config
export class Routes {
	static baseUrl = '/';
	static apiUrl = '/api/v1/';

	@prefix('apiUrl')
	static users = '/users/';

	@prefix('apiUrl')
	static user = '/users/:id/';

	@prefix('apiUrl')
	static users = '/users/';

	@prefix('baseUrl')
	static view_users = '/users/:id/';

	@prefix('baseUrl')
	static view_user = '/users/:id/';
}
```

#### Example output
```
import { Routes } from 'config/routes';

console.log(Routes.user) // -> /api/v1/users/:id/;
console.log(Routes.view_user) // -> /users/:id/;
```

---
<a name="app_interfaces"></a>
[Back to Menu](#main_menu)
### Interfaces
The interfaces that this library provides and that are described here provide help to the developer that will consume this library to build incredible web applications.

#### Constraints
The interfaces mentioned in this section will be importable only if you are developing your web application with `typescript`.

---
<a name="i_app_config"></a>
[Back to Menu](#main_menu)
### IAppConfig
Used as an argument for the `ApplicationInterface.construct` method, and used to create an instance of the class [ExpressCoreApplication](./ExpressCoreApplication.md) with arguments different from those used by default.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
appPath | string | true | The `__dirname` when using from **src/index.ts** file.
appName | string | false | Your application name
locals | any | false | any data that you want be available on `req.locals`
port | number | false | The port for tour webApplication; **defaults to 3000**
environment | string | false | When provided your app will use this env instead `NODE_ENV`
viewsConfig | IViewsSettings | false | `IViewsSettings` to use within tour web application.
bodyParser | IBodyParser | false | `IBodyParser` to use within tour web application.
preRouteHooks | RequestHandler[] | false | A valid middleware array that you want to use in your `Express.js` app.
publicFolder | string | false | Relative path to `Public` folder.
faviconPath | string | false | Relative path to `favicon`.
routesFolder | string | string[] | false | Relative path to Routes Folder.
errorHandler | ErrorRequestHandler | false | Error handler that you want yo use.

---
<a name="i_endpoint_config"></a>
[Back to Menu](#main_menu)
### IEndpointConfig
Interface Used to describe arguments for the method decorator "@endpoint".

It helps us to transform the decorated method into a useful Route handler for `Express.js`.

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
method | string OR string[] | true | Method, list of methods delimited by commas or an array of valid methods for `Express.js`.
path | string | true | Route path valid for `Express.js`.
middleware | RequestHandler[] | false | A valid middleware array that you want to prefix to your `Express.js` Route handler.
