import { expect, should } from 'chai';
import { Paging } from '../../src/entity/paging';
import * as pagingFixtures from '../fixtures/entity/paging';

should();
describe('@tne/express-app entity/paging', () => {

	it('should be a Class function', () => {
		expect(Paging).to.be.a('function');
	});

	it('should be valid paging 1 object', () => {
		const { page1 } = pagingFixtures;
		const paging = new Paging(page1);

		expect(paging).to.be.an('object')
			.that.has.keys('count', 'page', 'prev', 'next');

		expect(paging.count).to.be.a('number');
		expect(paging.page).to.be.a('number');
		expect(paging.next).to.be.a('string');

		expect(paging.count).to.be.equal(page1.count);
		expect(paging.page).to.be.equal(page1.page);

		expect(paging.prev).to.be.equal(null);

		expect(paging.next).to.contain(page1.uri);
		expect(paging.next).to.contain(`page=${page1.page + 1}`);
		expect(paging.next).to.contain(`per_page=${page1.per_page}`);
	});

	it('should be valid intermediate paging object', () => {
		const { page2 } = pagingFixtures;
		const paging = new Paging(page2);

		expect(paging).to.be.an('object')
			.that.has.keys('count', 'page', 'prev', 'next');

		expect(paging.count).to.be.a('number');
		expect(paging.page).to.be.a('number');
		expect(paging.prev).to.be.a('string');
		expect(paging.next).to.be.a('string');

		expect(paging.count).to.be.equal(page2.count);
		expect(paging.page).to.be.equal(page2.page);

		expect(paging.prev).to.contain(page2.uri);
		expect(paging.prev).to.contain(`page=${page2.page - 1}`);
		expect(paging.prev).to.contain(`per_page=${page2.per_page}`);

		expect(paging.next).to.contain(page2.uri);
		expect(paging.next).to.contain(`page=${page2.page + 1}`);
		expect(paging.next).to.contain(`per_page=${page2.per_page}`);
	});

	it('should be valid final paging object', () => {
		const { page3 } = pagingFixtures;
		const paging = new Paging(page3);

		expect(paging).to.be.an('object')
			.that.has.keys('count', 'page', 'prev', 'next');

		expect(paging.count).to.be.a('number');
		expect(paging.page).to.be.a('number');
		expect(paging.prev).to.be.a('string');

		expect(paging.count).to.be.equal(page3.count);
		expect(paging.page).to.be.equal(page3.page);

		expect(paging.prev).to.contain(page3.uri);
		expect(paging.prev).to.contain(`page=${page3.page - 1}`);
		expect(paging.prev).to.contain(`per_page=${page3.per_page}`);

		expect(paging.next).to.be.equal(null);
	});

	it('should be valid paging object with queryString args', () => {
		const { qsArgs } = pagingFixtures;
		const paging = new Paging(qsArgs);

		expect(paging).to.be.an('object')
			.that.has.keys('count', 'page', 'prev', 'next');

		expect(paging.count).to.be.a('number');
		expect(paging.page).to.be.a('number');
		expect(paging.prev).to.be.a('string');
		expect(paging.next).to.be.a('string');

		expect(paging.count).to.be.equal(qsArgs.count);
		expect(paging.page).to.be.equal(qsArgs.page);

		expect(paging.prev).to.contain(qsArgs.uri);
		expect(paging.prev).to.contain(`page=${qsArgs.page - 1}`);
		expect(paging.prev).to.contain(`per_page=${qsArgs.per_page}`);

		expect(paging.next).to.contain(qsArgs.uri);
		expect(paging.next).to.contain(`page=${qsArgs.page + 1}`);
		expect(paging.next).to.contain(`per_page=${qsArgs.per_page}`);

		Object.keys(qsArgs.queryStringArgs).forEach(key => {
			expect(paging.prev).to.contain(`${key}=${encodeURIComponent(qsArgs.queryStringArgs[key])}`);
			expect(paging.next).to.contain(`${key}=${encodeURIComponent(qsArgs.queryStringArgs[key])}`);
		});
	});
});

