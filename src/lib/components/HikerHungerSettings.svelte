<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import {
		type DisplaySettings,
		DistanceUnit,
		DistanceUnitIterable,
		EnergyUnit,
		EnergyUnitIterable
	} from '$lib/settings';
	import { Separator } from '$lib/components/ui/separator';
	import { createEventDispatcher } from 'svelte';
	export let displaySettings: DisplaySettings;
	const dispatch = createEventDispatcher<{
		updateDisplaySettings: DisplaySettings;
	}>();

	function selectDistanceUnit(unit: DistanceUnit) {
		displaySettings.distanceUnit = unit;
		dispatch('updateDisplaySettings', displaySettings);
	}
	function selectEnergyUnit(unit: EnergyUnit) {
		displaySettings.energyUnit = unit;
		dispatch('updateDisplaySettings', displaySettings);
	}
</script>

<div>
	<h1 class="font-bold">Display Settings</h1>
	<Separator class="my-6" />
	<Label class="my-3">
		<span class="my-3 font-bold">Distance Unit</span>
		<RadioGroup.Root value={displaySettings.distanceUnit}>
			{#each DistanceUnitIterable as unit}
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={unit} id={`r${unit}`} on:click={() => selectDistanceUnit(unit)} />
					<Label for={`r${unit}`}>{unit}</Label>
				</div>
				<RadioGroup.Input name="distance" />
			{/each}
		</RadioGroup.Root>
	</Label>
	<Separator class="my-6" />
	<Label class="my-3">
		<span class="my-3 font-bold">Energy Unit</span>
		<RadioGroup.Root value={displaySettings.energyUnit}>
			{#each EnergyUnitIterable as unit}
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={unit} id={`r${unit}`} on:click={() => selectEnergyUnit(unit)} />
					<Label for={`r${unit}`}>{unit}</Label>
				</div>
				<RadioGroup.Input name="energy" />
			{/each}
		</RadioGroup.Root>
	</Label>
</div>
