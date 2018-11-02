import { errorFormat } from '../lib/errorFormat';

export class Error401 {
	public status = 401;
	public message = 'Unauthorized: Access is denied due to invalid credentials or permissions.';
	public errors: any;

	constructor(E: any) {
		this.errors = errorFormat(E);
	}
}
