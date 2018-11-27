export function errorMessageLookup(Exception: any, defaultMsg: string): string {
	const { msg = null, message = null } = Exception;
	let res = defaultMsg;

	if (msg) {
		res = msg;
	} else if (message) {
		res = message;
	}

	return res;
}
