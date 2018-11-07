import { Paging } from './paging';

export class GET {
	public success = true;
	public message = 'Resource found';
	public data: any;
	public paging: Paging;

	constructor(params: any = {}) {
		const {
			rows = null,
			uri = null,
			count = null,
			page = null,
			per_page = null,
			queryStringArgs = null,
		} = params;

		// append paging Object
		if (rows && uri && count && page && per_page) {
			this.data = rows;
			this.paging = new Paging({ uri, count, page, per_page, queryStringArgs });
		} else {
			this.data = params;
		}
	}

	get status(): number {
		return 200;
	}
}

export class PUT {
	public success = true;
	public message = 'Resource updated';
	public data: any;

	constructor(params: any = {}) {
		this.data = params;
	}

	get status(): number {
		return 200;
	}
}

export class DELETE {
	public success = true;
	public message = 'Resource deleted';
	public data: any;

	constructor(params: any = {}) {
		this.data = params;
	}

	get status(): number {
		return 200;
	}
}

// Success POST
export class POST {
	public success = true;
	public message = 'Resource created';
	public data: any;

	constructor(params) {
		this.data = params;
	}

	get status(): number {
		return 201;
	}
}

// Response to a successful request that won't be returning a body
export class Http204 {
	get status(): number {
		return 204;
	}
}
