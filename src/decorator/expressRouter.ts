import { Router } from 'express';
import { IEndpointSettings, routerMethod } from '../interface/IAppSettings';

export function Endpoint({ method, path, middleware = [] }: IEndpointSettings): any {
	return function (constructor: any, propertyName: string) {
		if (path.charAt(0) !== '/') {
			const msg = 'path argument must contain the prefix: "/".';
			console.log(msg);
			throw TypeError(msg);
		}

		const allowedMethods = ['head', 'options', 'get', 'post', 'put', 'patch', 'del', 'delete', 'all'];
		const iterable = (typeof method === 'string') ? [method] : method;
		const value = {
			args: [path, ...middleware, constructor[propertyName]],
			methods: iterable.reduce((filtered, curr) => {
				curr = <routerMethod>curr.toLowerCase();

				if (allowedMethods.indexOf(curr) > -1) {
					filtered.push(curr);
				}

				return filtered;
			}, []),
		};


		if (value.methods.length === 0) {
			console.log(`omitting the endpoint Handler: '${propertyName}', because ${method} is not a valid method.`);
		}

		return { value };
	};
}

export function ExpressRouter(constructor: any): any {
	const router: Router = Router();
	const ignoredProperties = ['length', 'prototype', 'name', 'constructor'];
	const Endpoints = [
		...Object.getOwnPropertyNames(constructor),
		...Object.getOwnPropertyNames(constructor.prototype),
	].filter(v => ignoredProperties.indexOf(v) === -1);

	// Assign Endpoints to router
	Endpoints.forEach(v => {
		const { methods = [], args = [] } = constructor[v] || constructor.prototype[v] || {};

		methods.forEach(method => {
			router[method](...args);
		});
	});

	return router;
}
