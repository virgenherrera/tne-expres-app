import { resolve } from 'url';
import { Router } from 'express';
import { IEndpointConfig } from './interfaces';

export function expressRouter(constructor: any): any {
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

export function config(constructor) {
	Object.freeze(constructor);
	Object.freeze(constructor['prototype']);

	return constructor;
}

export function final<T extends { new(...args: any[]): object }>(target: T): T {
	return class Final extends target {
		constructor(...args: any[]) {
			if (new.target !== Final) {
				throw new Error('Cannot inherit from class decorated by final');
			}
			super(...args);
		}
	};
}

export function endpoint({ method, path, middleware = [] }: IEndpointConfig): any {
	return function (constructor: any, propertyName: string) {
		const allowedMethods = ['head', 'options', 'get', 'post', 'put', 'patch', 'del', 'delete', 'all'];
		const iterable = (typeof method === 'string') ? method.split(',') : method;
		const value = {
			args: [path, ...middleware, constructor[propertyName]],
			methods: iterable.reduce((filtered, curr) => {
				curr = curr.toLocaleLowerCase();

				if (allowedMethods.indexOf(curr) > -1) {
					filtered.push(curr);
				}

				return filtered;
			}, []),
		};


		if (value.methods.length === 0) {
			console.log(`omitting the endpoint Handler: '${propertyName}', because it does not match a valid Endpoint name.`);
		}

		return { value };
	};
}

export function prefix(propToPrefix: string = null) {
	return function (constructor: any, propName: string): any {
		const pathPrefix = constructor[propToPrefix] || null;
		const actualProp = constructor[propName] || null;

		if (!pathPrefix || !actualProp) {
			throw new TypeError('The prefix decorator can only be used with static properties.');
		}

		const value = resolve(pathPrefix, actualProp);

		return { value };
	};
}
