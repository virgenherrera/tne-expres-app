import { expect, should } from 'chai';
import * as express from 'express';
import { ExpressApplication } from '../../src';
import { settings } from '../fixtures/simpleApp/src';
import { dropLogs } from '../helpers';
import { Server as httpServer } from 'http';

should();
describe('@tne/express-app Interface test', () => {

	afterEach(async () => {
		const instance = ExpressApplication.getInstance();
		if (!instance) { return; }

		await ExpressApplication.destruct();

		dropLogs(instance.logsPath);
	});

	describe('construct()', () => {
		it('should throw if appPath is not present on settings', () => {
			expect(() => ExpressApplication.construct(<any>{})).to.throw();
		});

		it('should throw if appPath is present but does not lead to an existent path', () => {
			expect(() => ExpressApplication.construct({ appPath: '/non/valid/path' })).to.throw();
		});

		it('should throw if configPath does not exist on ../config', () => {
			expect(() => ExpressApplication.construct({ appPath: __dirname })).to.throw();
		});

		it('should throw if NODE_ENV does not match ../config/[NODE_ENV].json', () => {
			expect(() => ExpressApplication.construct({ ...settings, environment: 'fake_env' })).to.throw();
		});

		it('should return an express app instance after constructed', () => {
			expect(() => ExpressApplication.construct(settings)).to.not.throw();
			expect(ExpressApplication.getInstance()).to.have.property('app');
		});

		it('should warn when trying to construct app twice and return first constructed', () => {
			let instance1;
			let instance2;

			expect(() => instance1 = ExpressApplication.construct(settings)).to.not.throw();
			expect(() => instance2 = ExpressApplication.construct(settings)).to.not.throw();

			expect(instance1).to.be.deep.equal(instance2);
		});
	});

	describe('getInstance() ', () => {
		it('should return null if construct() method wasn\'t executed before', () => {
			expect(ExpressApplication.getInstance()).to.be.equal(null);
		});

		it('should be deep equal to construct() returned value', () => {
			let instance;

			expect(() => instance = ExpressApplication.construct(settings)).to.not.throw();
			expect(instance).to.be.deep.equal(ExpressApplication.getInstance());
		});
	});

	describe('destruct()', () => {
		it('should be null after destruct() was executed', async () => {
			ExpressApplication.construct(settings);
			await ExpressApplication.destruct();
			expect(ExpressApplication.getInstance()).to.be.equal(null);
		});
	});

	describe('getExpressApp()', () => {
		it('should be an instance if Express js if construct() was ran before', () => {
			ExpressApplication.construct(settings);
			expect(ExpressApplication.getExpressApp()).to.include.all.keys(Object.keys(express()));
		});

		it('should be null if construct() was NOT ran before', () => {
			expect(ExpressApplication.getExpressApp()).to.be.equal(null);
		});
	});

	describe('getServer()', () => {
		it('return server if construct() was ran before', () => {
			ExpressApplication.construct(settings);
			expect(ExpressApplication.getServer()).to.be.instanceOf(httpServer);
		});

		it('should be null if construct() was NOT ran before', () => {
			expect(ExpressApplication.getServer()).to.be.equal(null);
		});
	});
});
