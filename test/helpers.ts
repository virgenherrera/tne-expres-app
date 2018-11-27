import { sync as rimrafSync } from 'rimraf';

// rimraf || unlinkSync not working on windows :/
// https://github.com/nodejs/node-v0.x-archive/issues/3051
export function dropLogs(logsPath: string) {
	if (process.platform !== 'win32') {
		rimrafSync(logsPath);
	}
}
