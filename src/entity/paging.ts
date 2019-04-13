import { IPagingConfig } from '../interface';
import { prevUrlStringify, nextUrlStringify } from '../lib/pagerStringify';

export class Paging {
	public count: number;
	public page: number;
	public per_page: number;
	public prev: string;
	public next: string;

	constructor(args: IPagingConfig) {
		this.count = Number(args.count);
		this.page = Number(args.page);
		this.per_page = Number(args.per_page);
		this.prev = prevUrlStringify(args);
		this.next = nextUrlStringify(args);
	}
}
