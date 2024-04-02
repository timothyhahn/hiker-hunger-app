<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { displaySettingsStore} from '$lib/stores';
	import { DistanceUnitIterable, EnergyUnitIterable } from '$lib/settings';
	import { X } from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';

	// eslint-disable-next-line svelte/valid-compile
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	const displaySettings = displaySettingsStore;
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<div class="flex justify-between">
			<h1 class="font-bold self-center">Display Settings</h1>
			<button class="btn btn-sm" on:click={() => modalStore.close()}>
				<X />
			</button>
		</div>
		<div class="space-y-2">
			{#each DistanceUnitIterable as unit}
				<label class="flex items-center space-x-2 ">
					<input class="radio mr-5" type="radio" checked={$displaySettings.distanceUnit === unit} name="distanceUnit"
								 bind:group={$displaySettings.distanceUnit}
								 value={unit} />
					{unit}
				</label>
			{/each}
		</div>
		<hr />
		<div class="space-y-2">
			{#each EnergyUnitIterable as unit}
				<label class="flex items-center space-x-2 ">
					<input class="radio mr-5" type="radio" checked={$displaySettings.energyUnit === unit} name="energyUnit"
								 bind:group={$displaySettings.energyUnit}
								 value={unit} />
					{unit}
				</label>
			{/each}
		</div>
	</div>
{/if}