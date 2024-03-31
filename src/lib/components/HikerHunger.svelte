<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import Resupply from '$lib/components/Resupply.svelte';
	import { DEFAULT_DISPLAY_SETTINGS, type DisplaySettings, Trackable } from '$lib/settings';
	import { Menu } from 'lucide-svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { type Resupply as ResupplyType } from '$lib/resupply';
	import { onMount } from 'svelte';

	const VERSION_KEY = 'v1'
	const DISPLAY_SETTINGS_KEY = `displaySettings-${VERSION_KEY}`;
	const CURRENT_RESUPPLY_KEY = `currentResupply-${VERSION_KEY}`;

	let displaySettings: Writable<DisplaySettings> = writable(structuredClone(DEFAULT_DISPLAY_SETTINGS));

	export const DEFAULT_RESUPPLY: ResupplyType = {
		[Trackable.energy]: true,
		[Trackable.protein]: false,
		[Trackable.carbohydrates]: false,
		[Trackable.fat]: false,
		things: [],
		distanceToNextResupply: null,
		daysToNextResupply: null,
	};

	let resupply: Writable<ResupplyType> = writable(structuredClone(DEFAULT_RESUPPLY));
	onMount(() => {
		if (localStorage.getItem(DISPLAY_SETTINGS_KEY)) {
			try {
				displaySettings.set(JSON.parse(localStorage.getItem(DISPLAY_SETTINGS_KEY)));
			} catch (err) {
				console.error('Failed to parse display settings from local storage', err);
			}
		}
		if (localStorage.getItem(CURRENT_RESUPPLY_KEY)) {
			try {
				resupply.set(JSON.parse(localStorage.getItem(CURRENT_RESUPPLY_KEY)));
			} catch (err) {
				console.error('Failed to parse current resupply from local storage', err);
			}
		}
		displaySettings.subscribe((value) => {
			localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(value));
		});
		resupply.subscribe((value) => {
			localStorage.setItem(CURRENT_RESUPPLY_KEY, JSON.stringify(value));
		});
	})
</script>

<main class="h-[100vh] w-full">
	<Sheet.Root>
		<div class="p-6">
			<div class="flex justify-between">
				<div class="flex">
					<Sheet.Trigger>
						<Menu />
					</Sheet.Trigger>
					<div class="ml-3 font-extrabold">Hiker Hunger</div>
				</div>
			</div>
		</div>

		<div class="my-6">
			<Resupply bind:resupply={resupply} displaySettings={$displaySettings} />
		</div>
		<Sheet.Content side="left" class="w-full !max-w-full text-left">
			<Sheet.Header>
				<Sheet.Title>Settings</Sheet.Title>
				<Sheet.Description class="overflow-scroll text-left">
					<NavBar bind:resupply={resupply} bind:displaySettings={displaySettings} />
				</Sheet.Description>
			</Sheet.Header>
		</Sheet.Content>
	</Sheet.Root>
</main>
