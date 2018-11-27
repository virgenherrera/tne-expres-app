export class Pager {
	public page: number;
	public per_page: number;

	constructor({ page, per_page }) {
		this.page = page;
		this.per_page = per_page;
	}
}
