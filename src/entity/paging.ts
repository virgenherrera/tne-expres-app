import { IPagingConfig } from '../interfaces';
import { prevUrlStringify, nextUrlStringify } from '../lib/pagerStringify';

export class Paging {
	public count: number;
	public page: number;
	public prev: string;
	public next: string;

	constructor(args: IPagingConfig) {
		this.count = Number(args.count);
		this.page = Number(args.page);
		this.prev = prevUrlStringify(args);
		this.next = nextUrlStringify(args);
	}
}
