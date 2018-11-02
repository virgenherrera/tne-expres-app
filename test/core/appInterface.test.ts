import { expect, should } from 'chai';
import * as express from 'express';
import { AppInterface } from '../../src';
import { settings as simpleAppSettings } from '../fixtures/simpleApp/src';

should();
describe('@tne/express-app Interface test', () => {

	afterEach((done) => {
		AppInterface.destruct();

		done();
	});

	it('should expose the App interface static methods', () => {
		expect(AppInterface).to.be.a('function');
		expect(AppInterface.construct).to.be.a('function');
		expect(AppInterface.destruct).to.be.a('function');
		expect(AppInterface.getInstance).to.be.a('function');
		expect(AppInterface.getExpressApp).to.be.a('function');
	});

	describe('construct()', () => {
		it('should return an express app instance after constructed', (done) => {
			let instance;

			try {
				instance = AppInterface.construct(simpleAppSettings);

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
				instance1 = AppInterface.construct(simpleAppSettings);
				instance2 = AppInterface.construct(simpleAppSettings);

				expect(instance1).to.be.deep.equal(instance2);

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('getInstance() ', () => {
		it('should return null if construct() method wasn\'t executed before', () => {
			expect(AppInterface.getInstance()).to.be.equal(null);
		});

		it('should be deep equal to construct() returned value', (done) => {
			let instance;

			try {
				instance = AppInterface.construct(simpleAppSettings);

				expect(instance).to.be.deep.equal(AppInterface.getInstance());

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('destruct()', () => {
		it('should be null after destruct() was executed', (done) => {
			try {
				AppInterface.construct(simpleAppSettings);
				AppInterface.destruct();

				expect(AppInterface.getInstance()).to.be.equal(null);

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('getExpressApp()', () => {
		it('should null if construct() wasn\'t ran before', (done) => {
			try {
				expect(AppInterface.getExpressApp()).to.to.be.equal(null);

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should be an instance if Express js if construct() was ran before', (done) => {
			try {
				AppInterface.construct(simpleAppSettings);

				expect(AppInterface.getExpressApp()).to.include.all.keys(Object.keys(express()));

				done();
			} catch (E) {
				done(E);
			}
		});
	});
});
