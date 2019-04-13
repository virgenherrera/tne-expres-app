import urlJoin = require('url-join');

export function Config(constructor) {
	Object.freeze(constructor);
	Object.freeze(constructor.prototype);

	return constructor;
}

export function FinalClass<T extends new (...args: any[]) => object>(target: T): T {
	return class Final extends target {
		constructor(...args: any[]) {
			if (new.target !== Final) {
				throw new Error('Cannot inherit from class decorated by final');
			}
			super(...args);
		}
	};
}

export function Prefix(propToPrefix: string = null) {
	return function (constructor: any, propName: string): any {
		const pathPrefix = constructor[propToPrefix] || null;
		const actualProp = constructor[propName] || null;

		if (!pathPrefix || !actualProp) {
			throw new TypeError('The prefix decorator can only be used with static properties.');
		}

		const value = urlJoin(pathPrefix, actualProp);

		return { value };
	};
}
