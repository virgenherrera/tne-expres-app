import { expect, should } from 'chai';
import * as express from 'express';
import { ExpressApplication } from '../../src';
import { appPath } from '../fixtures/simpleApp/src';
import { dropLogs } from '../helpers';

should();
describe('@tne/express-app Interface test', () => {

	afterEach(async () => {
		const instance = ExpressApplication.getInstance();
		if (!instance) { return; }

		await ExpressApplication.destruct();

		dropLogs(instance.logsPath);
	});

	describe('construct()', () => {
		it('should return an express app instance after constructed', () => {

			expect(() => ExpressApplication.construct(appPath)).to.not.throw();
			expect(ExpressApplication.getInstance()).to.have.property('app');
		});

		it('should warn when trying to construct app twice and return first constructed', () => {
			let instance1;
			let instance2;

			expect(() => instance1 = ExpressApplication.construct(appPath)).to.not.throw();
			expect(() => instance2 = ExpressApplication.construct(appPath)).to.not.throw();

			expect(instance1).to.be.deep.equal(instance2);
		});
	});

	describe('getInstance() ', () => {
		it('should return null if construct() method wasn\'t executed before', () => {
			expect(ExpressApplication.getInstance()).to.be.equal(null);
		});

		it('should be deep equal to construct() returned value', () => {
			let instance;

			expect(() => instance = ExpressApplication.construct(appPath)).to.not.throw();
			expect(instance).to.be.deep.equal(ExpressApplication.getInstance());
		});
	});

	describe('destruct()', () => {
		it('should be null after destruct() was executed', async () => {
			ExpressApplication.construct(appPath);
			await ExpressApplication.destruct();
			expect(ExpressApplication.getInstance()).to.be.equal(null);
		});
	});

	describe('getExpressApp()', () => {
		it('should be an instance if Express js if construct() was ran before', () => {
			ExpressApplication.construct(appPath);
			expect(ExpressApplication.getExpressApp()).to.include.all.keys(Object.keys(express()));
		});
	});
});
