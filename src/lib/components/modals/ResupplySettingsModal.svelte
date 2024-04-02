<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { displaySettingsStore, resupplyStore } from '$lib/stores';
	import { PrimaryStat } from '$lib/resupply';
	import { X } from 'lucide-svelte';
	import { iterableTrackables } from '$lib/trackable';

	// eslint-disable-next-line svelte/valid-compile
	export let parent: SvelteComponent;
	const modalStore = getModalStore();
	const resupply = resupplyStore;
	const displaySettings = displaySettingsStore;
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
		<div class="flex justify-between">
			<header class="text-2xl font-bold">Resupply Settings</header>
			<button class="btn btn-sm" on:click={() => modalStore.close()}>
				<X />
			</button>
		</div>
		<h1 class="font-bold">Info about resupply</h1>
		<div class="mx-3 my-3">
			<label for="daysToNext">Days until next resupply</label>
			<input
				id="daysToNext"
				class="input"
				type="number"
				bind:value={$resupply.daysToNextResupply}
			/>
		</div>

		<div class="mx-3 my-3">
			<label for="distanceToNext">
				{$displaySettings.distanceUnit} to next resupply
			</label>
			<input
				id="distanceToNext"
				class="input"
				type="number"
				bind:value={$resupply.distanceToNextResupply}
			/>
		</div>
		<hr class="my-3" />

		<h1 class="font-bold">What to keep track of</h1>
		{#each iterableTrackables as trackable}
			<div class="flex">
			<input
				id="{trackable}"
				class="checkbox mr-3"
				type="checkbox"
				bind:checked={$resupply[trackable]}
			/>
				<label for="{trackable}">{trackable}</label>
			</div>
		{/each}
		<hr class="my-3" />
		<h1 class="font-bold">What do you care most about keeping track of?</h1>
		<h3 class="text-sm font-light text-primary-900-50-token my-1">
			All of these things will appear if you open the Summary tab at the bottom.
		</h3>
		<h3 class="text-sm font-light text-primary-900-50-token my-1">
			This just selects what will always be visible on the main page.
		</h3>
		<div class="my-3">
			<label for="primaryStat">Primary Stat</label>
			<select id="primaryStat" class="select" bind:value={$displaySettings.primaryStat}>
				{#each Object.values(PrimaryStat) as primaryStat}
					<option value={primaryStat} selected={primaryStat === $displaySettings.primaryStat}>
						{primaryStat}
					</option>
				{/each}
			</select>
		</div>
	</div>
{/if}