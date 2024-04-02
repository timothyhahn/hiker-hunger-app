<script lang="ts">
	import { PrimaryStat, type Resupply, statToTrackable } from '$lib/resupply';
	import { getPrimaryStatValue } from '$lib/trackable';
	import type { Writable } from 'svelte/store';
	import type { DisplaySettings } from '$lib/settings';
	import { displaySettingsStore, resupplyStore } from '$lib/stores';

	export let resupply: Writable<Resupply> = resupplyStore;
	export let displaySettings: DisplaySettings = $displaySettingsStore;
</script>

<div>
	{#each Object.keys(PrimaryStat) as stat}
		<div class="my-3">
			{#if PrimaryStat[stat] === PrimaryStat.numItems}
				<div class="font-bold">{PrimaryStat[stat]}:</div>
				{getPrimaryStatValue($resupply, PrimaryStat[stat], displaySettings)}
			{:else if $resupply[statToTrackable(PrimaryStat[stat])]}
				<div class="font-bold">{PrimaryStat[stat]}:</div>
				{getPrimaryStatValue($resupply, PrimaryStat[stat], displaySettings)}
			{/if}
		</div>
	{/each}
</div>
