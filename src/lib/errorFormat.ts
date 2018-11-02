export function errorFormat(Exception: any): Error[] {
	let Errors;

	if (Array.isArray(Exception)) {
		Errors = Exception.map(E => (E instanceof Error) ? E : new Error(JSON.stringify(E)));
	} else if (Exception instanceof Error) {
		Errors = [Exception];
	} else {
		Errors = [new Error(JSON.stringify(Exception))];
	}

	return Errors;
}
