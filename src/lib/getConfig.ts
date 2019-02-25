import { getFromHaystack } from '@tne/common';

export function getConfig(settings: any, path: string, defaultValue: any = null): any {
	const keysReplacer = '$keys.';
	const envReplacer = '$env.';
	const { keys } = settings;
	let val = getFromHaystack(path, settings, defaultValue);

	if (val && keys && typeof val === 'string' && val.indexOf(keysReplacer) === 0) {
		const keysPath = val.replace(keysReplacer, '');
		val = getFromHaystack(keysPath, settings.keys, defaultValue);
	} else if (val && typeof val === 'string' && val.indexOf(envReplacer) === 0) {
		const keysPath = val.replace(envReplacer, '');
		val = getFromHaystack(keysPath, process.env, defaultValue);
	}

	return val;
}
