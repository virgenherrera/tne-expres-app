import { expect, should } from 'chai';
import * as express from 'express';
import * as TneAppIndex from '../../src';

should();
describe('@tne/express-app index', () => {
	it('should expose all framework libraries', () => {
		const exports = [
			'express',
			'expressRouter',
			'RestHandler',
			'endpoint',
			'Endpoint',
			'Route',
			'ExpressAppInterface',
			'AppInterface',
			'ApplicationInterface',
			'config',
			'final',
			'prefix',
			'Config',
			'Final',
			'Prefix',
			'jwtAuth',
		];

		expect(TneAppIndex).to.be.an('object').that.has.keys(exports);
	});

	it('should expose encapsulated pristine express framework', () => {
		expect(TneAppIndex.express).to.be.a('function');
		expect(TneAppIndex.express).to.be.deep.equal(express);
	});

	it('should aliases be aliases', () => {
		expect(TneAppIndex.ExpressAppInterface).to.be.deep.equal(TneAppIndex.AppInterface);
		expect(TneAppIndex.ApplicationInterface).to.be.deep.equal(TneAppIndex.AppInterface);
		expect(TneAppIndex.expressRouter).to.be.deep.equal(TneAppIndex.RestHandler);
		expect(TneAppIndex.Endpoint).to.be.deep.equal(TneAppIndex.endpoint);
		expect(TneAppIndex.Route).to.be.deep.equal(TneAppIndex.endpoint);
		expect(TneAppIndex.config).to.be.deep.equal(TneAppIndex.Config);
		expect(TneAppIndex.final).to.be.deep.equal(TneAppIndex.Final);
		expect(TneAppIndex.prefix).to.be.deep.equal(TneAppIndex.Prefix);
	});
});
