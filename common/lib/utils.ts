declare global {
	var _timers: Map<string, number>;
}
let timers = global._timers;
if (!timers) global._timers = timers = new Map<string, number>();

export function setSafeTime(time: string) {
	timers.set(time, Date.now()); // Set the start time manually
}

export function logSafeTime(time: string, message: string) {
	if (process.env.NODE_ENV !== 'development') return; // Skip logging in non-development environments
	const startTime = timers.get(time);

	if (startTime) {
		const elapsed = Date.now() - startTime;
		console.info(`${time}: ${message} - ${elapsed}ms`);
		timers.delete(time); // Clean up the timer after infoging
	} else {
		console.info(`${time}: SERVER_RESTARTED - ${message}`);
	}
}
