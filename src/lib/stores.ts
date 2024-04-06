import { DEFAULT_DISPLAY_SETTINGS, type DisplaySettings } from '$lib/settings';
import { type Writable, writable } from 'svelte/store';
import { newResupply, type Resupply as ResupplyType } from '$lib/resupply';
import type { Persistence } from '$lib/persistence';

export const displaySettingsStore: Writable<DisplaySettings> = writable(
	structuredClone(DEFAULT_DISPLAY_SETTINGS)
);

export const resupplyStore: Writable<ResupplyType> = writable({
	...structuredClone(newResupply())
});

export const persistenceStore: Writable<Persistence> = writable(null);