export class Error404 {
	public status = 404;
	public success = false;

	constructor(
		public message: string
	) { }
}
