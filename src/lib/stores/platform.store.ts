import { writable } from 'svelte/store';

function createPlatformStore() {
	const { subscribe, set, update } = writable<string[]>([]);

	return {
		subscribe,
		addPlatform: (platform: string) =>
			update((platforms) => [...new Set([...platforms, platform])]),
		removePlatform: (platform: string) =>
			update((platforms) => platforms.filter((storePlatform) => storePlatform !== platform)),
		resetPlatforms: () => set([])
	};
}

export const platformStore = createPlatformStore();
