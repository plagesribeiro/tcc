import defaultSettings from './defaults.json';

export const settings = (): typeof defaultSettings =>
	Object.fromEntries(
		Object.entries(defaultSettings).map(([key, value]) => [
			key,
			process.env[key] ?? value
		])
	) as typeof defaultSettings;
