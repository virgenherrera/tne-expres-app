import { stringify } from 'querystring';

export function prevUrlStringify({ uri, page, per_page, queryStringArgs = {} }: any): string {
	if (page > 1) {
		const baseArgs = {
			page: page - 1,
			per_page: per_page,
		};
		const args = { ...baseArgs, ...queryStringArgs };

		return `${uri}?${stringify(args)}`;
	} else {
		return null;
	}
}

export function nextUrlStringify({ uri, count, page, per_page, queryStringArgs = {} }: any): string {
	if ((page * per_page) < count) {
		const baseArgs = {
			page: page + 1,
			per_page: per_page,
		};
		const args = { ...baseArgs, ...queryStringArgs };

		return `${uri}?${stringify(args)}`;
	} else {
		return null;
	}
}
