import * as urlJoin from 'url-join';

export function concatUri(...segments: string[]): string {
	return urlJoin(...segments);
}
