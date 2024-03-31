<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import Resupply from '$lib/components/Resupply.svelte';
	import { DEFAULT_DISPLAY_SETTINGS, type DisplaySettings, Trackable } from '$lib/settings';
	import { Menu } from 'lucide-svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { type Resupply as ResupplyType } from '$lib/resupply';

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
