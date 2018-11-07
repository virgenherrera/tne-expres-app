import { errorFormat } from '../lib/errorFormat';
import { IErrorDto } from '../interfaces';

// Used for validation errors
export class Error400 implements IErrorDto {
	public success = false;
	public message = 'Request could not be understood due to malformed syntax. You SHOULD NOT repeat the request without modifications.';
	public errors;

	constructor(errors: any) {
		this.errors = errorFormat(errors);
	}

	get status(): number {
		return 400;
	}
}

// Failed Auth
export class Error401 implements IErrorDto {
	public success = false;
	public message = 'Unauthorized: Access is denied due to invalid credentials or permissions.';
	public errors;

	constructor(errors: any) {
		this.errors = errorFormat(errors);
	}

	get status(): number {
		return 401;
	}
}

// Failed Auth
export class Error403 implements IErrorDto {
	public success = false;
	public message = 'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort and the request SHOULD NOT be repeated.';
	public errors;

	constructor(errors: any) {
		this.errors = errorFormat(errors);
	}

	get status(): number {
		return 403;
	}
}

// not found
export class Error404 implements IErrorDto {
	public success = false;
	public message = 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.';
	public errors;

	constructor(errors: any) {
		this.errors = errorFormat(errors);
	}

	get status(): number {
		return 404;
	}
}

// bad-Headers
export class Error406 implements IErrorDto {
	public success = false;
	public message = `The requested resource is capable of generating only content not acceptable according to the Content-Type sent in the request.`;
	public errors;

	constructor(errors: any) {
		this.errors = errorFormat(errors);
	}

	get status(): number {
		return 406;
	}
}

// Internal Server Error
export class Error500 implements IErrorDto {
	public success = false;
	public message = 'Internal Server Error';

	constructor() { }

	get status(): number {
		return 500;
	}
}
