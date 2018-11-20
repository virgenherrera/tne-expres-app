import { expect, should } from 'chai';
import * as express from 'express';
import { ApplicationInterface } from '../../src';
import { settings as simpleAppSettings } from '../fixtures/simpleApp/src';

should();
describe('@tne/express-app Interface test', () => {

	afterEach((done) => {
		ApplicationInterface.destruct();

		done();
	});

	it('should expose the App interface static methods', () => {
		expect(ApplicationInterface).to.be.a('function');
		expect(ApplicationInterface.construct).to.be.a('function');
		expect(ApplicationInterface.destruct).to.be.a('function');
		expect(ApplicationInterface.getInstance).to.be.a('function');
		expect(ApplicationInterface.getExpressApp).to.be.a('function');
	});

	describe('construct()', () => {
		it('should return an express app instance after constructed', (done) => {
			let instance;

			try {
				instance = ApplicationInterface.construct(simpleAppSettings);

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
				instance1 = ApplicationInterface.construct(simpleAppSettings);
				instance2 = ApplicationInterface.construct(simpleAppSettings);

				expect(instance1).to.be.deep.equal(instance2);

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('getInstance() ', () => {
		it('should return null if construct() method wasn\'t executed before', () => {
			expect(ApplicationInterface.getInstance()).to.be.equal(null);
		});

		it('should be deep equal to construct() returned value', (done) => {
			let instance;

			try {
				instance = ApplicationInterface.construct(simpleAppSettings);

				expect(instance).to.be.deep.equal(ApplicationInterface.getInstance());

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('destruct()', () => {
		it('should be null after destruct() was executed', (done) => {
			try {
				ApplicationInterface.construct(simpleAppSettings);
				ApplicationInterface.destruct();

				expect(ApplicationInterface.getInstance()).to.be.equal(null);

				done();
			} catch (E) {
				done(E);
			}
		});
	});

	describe('getExpressApp()', () => {
		it('should null if construct() wasn\'t ran before', (done) => {
			try {
				expect(ApplicationInterface.getExpressApp()).to.to.be.equal(null);

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should be an instance if Express js if construct() was ran before', (done) => {
			try {
				ApplicationInterface.construct(simpleAppSettings);

				expect(ApplicationInterface.getExpressApp()).to.include.all.keys(Object.keys(express()));

				done();
			} catch (E) {
				done(E);
			}
		});
	});
});
