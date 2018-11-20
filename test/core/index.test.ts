import { expect, should } from 'chai';
import * as express from 'express';
import * as TneAppIndex from '../../src';

should();
describe('@tne/express-app index', () => {
	it('should expose all framework libraries', () => {
		const exports = [
			'express',
			'jwtAuth',
			'ApplicationInterface',
			'expressRouter',
			'endpoint',
			'config',
			'final',
			'prefix',
		];

		expect(TneAppIndex).to.be.an('object').that.has.keys(exports);
	});

	it('should expose encapsulated pristine express framework', () => {
		expect(TneAppIndex.express).to.be.a('function');
		expect(TneAppIndex.express).to.be.deep.equal(express);
	});
});
