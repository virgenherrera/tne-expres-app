# @tne/express-app
A library that provides an interface and some tools to work with express applications through different environments.

---
<a name="main_menu"></a>
## Menu
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
- [IAppConfig](#i_appConfig)
- [IEndpointConfig](#i_endpoint_config)

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

#### [IAppConfig](#i_appConfig) Example
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

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
method | string OR string[] | true | Method, list of methods delimited by commas or an array of valid methods for `Express.js`.
path | string | true | Route path valid for `Express.js`.
middleware | RequestHandler[] | false | A valid middleware array that you want to prefix to your `Express.js` Route handler.

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
Description here!

#### Parameters
| Param | Type | Required? | Description |
|-|-|-|-|
param1 | string | true | Description
param2 | string | true | Description
param3 | string | true | Description

#### Example
```
	code here!
```
