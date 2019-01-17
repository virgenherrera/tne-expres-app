export function parseSort(rawSort: string = ''): any {
	{
		return rawSort
			.split(',')
			.reduce((sort, item: string) => {
				if (!item) { return sort; }

				let order = 'asc';
				if (item.charAt(0) === '-') {
					order = 'desc';
					item = item.substring(1);
				}

				sort[item] = order;

				return sort;
			}, {});
	}
}
