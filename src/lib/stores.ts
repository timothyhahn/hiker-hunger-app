import { DEFAULT_DISPLAY_SETTINGS, type DisplaySettings } from '$lib/settings';
import { type Writable, writable } from 'svelte/store';
import { newResupply, type Resupply as ResupplyType } from '$lib/resupply';

export const displaySettingsStore: Writable<DisplaySettings> = writable(
	structuredClone(DEFAULT_DISPLAY_SETTINGS)
);

export const resupplyStore: Writable<ResupplyType> = writable({
	...structuredClone(newResupply())
});
