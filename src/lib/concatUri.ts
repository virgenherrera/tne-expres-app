import urlJoin = require('url-join');

export function concatUri(...segments: string[]): string {
	return urlJoin(...segments);
}
