import { expect, should } from 'chai';
import { errorFormat } from '../../src/lib/errorFormat';

should();
describe('lib/errorFormat()', () => {
	it('should be  function', () => {
		expect(errorFormat).to.be.a('function');
	});

	it('should format a string as an Error', () => {
		const err = 'string based error';
		const errs = errorFormat(err);

		expect(errs).to.be.an('array');
		errs.forEach(e => expect(e).to.be.an.instanceOf(Error));
	});

	it('should format a simple error', () => {
		const err = new Error('basic error');
		const errs = errorFormat(err);

		expect(errs).to.be.an('array');
		errs.forEach(e => expect(e).to.be.an.instanceOf(Error));
	});

	it('should format a TypeError', () => {
		const err = new TypeError('TypeError error');
		const errs = errorFormat(err);

		expect(errs).to.be.an('array');
		errs.forEach(e => expect(e).to.be.an.instanceOf(TypeError));
	});

	it('should format a Object', () => {
		const err = { type: 401, message: 'some message' };
		const errs = errorFormat(err);

		expect(errs).to.be.an('array');
		errs.forEach(e => expect(e).to.be.an.instanceOf(Error));
	});

	it('should format an array of errors', () => {
		const err = [new Error('error 1'), new TypeError('error 2'), 'another erro', { type: 401, message: 'some message' }];
		const errs = errorFormat(err);

		expect(errs).to.be.an('array');
		errs.forEach(e => expect(e).to.be.an.instanceOf(Error));
	});
});
