import { expect, should } from 'chai';
import * as express from 'express';
import { ExpressApplication } from '../../src';
import { settings as simpleAppSettings } from '../fixtures/simpleApp/src';

should();
describe('@tne/express-app Interface test', () => {

	afterEach((done) => {
		ExpressApplication.destruct();

		done();
	});

	it('should expose the App interface static methods', () => {
		expect(ExpressApplication).to.be.a('function');
		expect(ExpressApplication.construct).to.be.a('function');
		expect(ExpressApplication.destruct).to.be.a('function');
		expect(ExpressApplication.getInstance).to.be.a('function');
		expect(ExpressApplication.getExpressApp).to.be.a('function');
	});

	describe('construct()', () => {
		it('should return an express app instance after constructed', (done) => {
			let instance;

			try {
				instance = ExpressApplication.construct(simpleAppSettings);

				expect(instance).to.have.property('app');

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should warn when trying to construct app twice and return first constructed', (done) => {
			let instance1;
			let instance2;

			try {
				instance1 = ExpressApplication.construct(simpleAppSettings);
				instance2 = ExpressApplication.construct(simpleAppSettings);

				expect(instance1).to.be.deep.equal(instance2);

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('getInstance() ', () => {
		it('should return null if construct() method wasn\'t executed before', () => {
			expect(ExpressApplication.getInstance()).to.be.equal(null);
		});

		it('should be deep equal to construct() returned value', (done) => {
			let instance;

			try {
				instance = ExpressApplication.construct(simpleAppSettings);

				expect(instance).to.be.deep.equal(ExpressApplication.getInstance());

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('destruct()', () => {
		it('should be null after destruct() was executed', (done) => {
			try {
				ExpressApplication.construct(simpleAppSettings);
				ExpressApplication.destruct();

				expect(ExpressApplication.getInstance()).to.be.equal(null);

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('getExpressApp()', () => {
		it('should null if construct() wasn\'t ran before', (done) => {
			try {
				expect(ExpressApplication.getExpressApp()).to.to.be.equal(null);

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should be an instance if Express js if construct() was ran before', (done) => {
			try {
				ExpressApplication.construct(simpleAppSettings);

				expect(ExpressApplication.getExpressApp()).to.include.all.keys(Object.keys(express()));

				done();
			} catch (E) {
				done(E);
			}
		});
	});
});
