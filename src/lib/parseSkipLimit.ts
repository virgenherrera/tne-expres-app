export function parseSkipLimit(page: number, per_page: number, count: number) {
	const skip = (page === 1) ? 0 : (page - 1) * per_page;
	const limit = per_page;

	if (skip > count) {
		throw { type: 400, message: 'Out of the available bounds.' };
	}

	return { skip, limit };
}
