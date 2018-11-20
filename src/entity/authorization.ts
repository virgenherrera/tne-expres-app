import { IAuthorization } from '../interface';

export class Authorization implements IAuthorization {
	public token = null;
	public decodedToken = null;
	public user = null;

	constructor(args) {
		this.token = args.token;
		this.decodedToken = args.decodedToken;
		this.user = args.user;
	}
}
