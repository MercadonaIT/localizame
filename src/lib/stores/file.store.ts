import { writable } from 'svelte/store';

function createUserStore() {
	const { subscribe, set } = writable<File | undefined>();

	return {
		subscribe,
		select: (file?: File) => set(file),
		reset: () => set(undefined)
	};
}

export const fileStore = createUserStore();
