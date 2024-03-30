<script lang="ts">
	import TrackableLineItem from '$lib/components/TrackableLineItem.svelte';
	import ResupplyInformation from '$lib/components/ResupplyInformation.svelte';
	import { type DisplaySettings, Trackable } from '$lib/settings';
	import type { Resupply } from '$lib/resupply';

	export let displaySettings: DisplaySettings;
	const DEFAULT_RESUPPLY: Resupply = {
		totals: {
			[Trackable.energy]: 0,
			[Trackable.carbohydrates]: 0,
			[Trackable.protein]: 0,
			[Trackable.fat]: 0
		},
		tracked: new Set([Trackable.energy]),
		daysToNextResupply: null,
		distanceToNextResupply: null
	} as const;

	let resupply: Resupply = structuredClone(DEFAULT_RESUPPLY);
	let clearValues: () => void;

	function addItem(event: CustomEvent<{ value: number; trackable: Trackable }>) {
		const { value: amount, trackable } = event.detail;
		resupply.totals[trackable] += amount;
	}

	function toggleTracked(event: CustomEvent<{ trackable: Trackable }>) {
		const { trackable } = event.detail;
		if (resupply.tracked.has(trackable)) {
			resupply.tracked.delete(trackable);
			resupply.tracked = resupply.tracked;
		} else {
			resupply.tracked = resupply.tracked.add(trackable);
		}
	}

	function updateDaysToNext(event: CustomEvent<number>) {
		const value = event.detail;
		if (isNaN(value)) {
			return;
		}
		resupply.daysToNextResupply = value;
	}

	function updateDistanceToNext(event: CustomEvent<number>) {
		const value = event.detail;
		if (isNaN(value)) {
			return;
		}
		resupply.distanceToNextResupply = value;
	}

	function clearAll() {
		resupply = DEFAULT_RESUPPLY;
		clearValues();
	}
</script>

<div class="p-6">
	{#each resupply.tracked.keys() as trackable}
		<TrackableLineItem
			{trackable}
			on:addItem={addItem}
			{displaySettings}
			bind:clearAll={clearValues}
		/>
	{/each}
</div>
<ResupplyInformation
	{resupply}
	{displaySettings}
	on:clearAll={clearAll}
	on:toggleTracked={toggleTracked}
	on:updateDaysToNext={updateDaysToNext}
	on:updateDistanceToNext={updateDistanceToNext}
/>
