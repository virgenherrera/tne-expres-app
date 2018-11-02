export const page1 = {
	uri: 'domain.com/endpoint/path',
	count: 99,
	page: 1,
	per_page: 35,
};

export const page2 = {
	uri: 'domain.com/endpoint/path',
	count: 99,
	page: 2,
	per_page: 35,
};

export const page3 = {
	uri: 'domain.com/endpoint/path',
	count: 99,
	page: 3,
	per_page: 35,
};

export const qsArgs = {
	uri: 'domain.com/endpoint/path',
	count: 1e4,
	page: 3,
	per_page: 100,
	queryStringArgs: {
		sort: 'name:ASC,age:DESC',
		k1: 'v1',
		k2: 'v2',
		active: true,
		other_arg: 'other value'
	}
};
