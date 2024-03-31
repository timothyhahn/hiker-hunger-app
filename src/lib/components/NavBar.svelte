<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { DistanceUnitIterable, EnergyUnitIterable, Trackable } from '$lib/settings';
	import type { DisplaySettings } from '$lib/settings';
	import { Separator } from '$lib/components/ui/separator';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { PrimaryStat, type Resupply } from '$lib/resupply';
	import { ScrollArea } from '$lib/components/ui/scroll-area';


	export let resupply: Writable<Resupply>;
	export let displaySettings: Writable<DisplaySettings>;

	function updatePrimaryStat(stat: PrimaryStat) {
		displaySettings.update((settings) => {
			settings.primaryStat = stat;
			return settings;
		});
	}
</script>

<div class="w-[95%] h-[80vh] p-5 overflow-y-scroll dark:text-gray-300">
	<Separator />
	<h1 class="font-bold">What to track?</h1>
	{#each Object.values(Trackable) as trackable}
		<div class="py-2">
			<Checkbox
				id="terms"
				bind:checked={$resupply[trackable]}
				aria-labelledby="terms-label"
			/>
			<Label
				id="terms-label"
				for="terms"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{trackable}
			</Label>
		</div>
	{/each}
	<Separator />
	<h1 class="font-bold">Info about resupply</h1>
	<div class="mx-3 my-3">
		<Label for="daysToNext">Days until next resupply</Label>
		<Input
			id="daysToNext"
			type="number"
			bind:value={$resupply.daysToNextResupply}
		/>
	</div>

	<div class="mx-3 my-3">
		<Label for="distanceToNext">
			{$displaySettings.distanceUnit} to next resupply
		</Label>
		<Input
			id="distanceToNext"
			type="number"
			bind:value={$resupply.distanceToNextResupply}
		/>
	</div>
	<Separator class="my-3" />
	<h1 class="font-bold">What do you care most about keeping track of?</h1>
	<h3 class="text-sm font-light text-gray-700 my-1">
		All of these things will appear if you open the Summary tab at the bottom.

	</h3>
	<h3 class="text-sm font-light text-gray-700 my-1">
		This just selects what will always be visible on the main page.
	</h3>
	<div class="my-3">
		<Select.Root>
			<Select.Trigger class="w-[99%] mx-3">
				<Select.Value placeholder={$displaySettings.primaryStat} />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Select</Select.Label>
					<ScrollArea class="h-[250px]">
						{#each Object.values(PrimaryStat) as primaryStat}
							<Select.Item value={primaryStat} on:click={() => updatePrimaryStat(primaryStat)}>{primaryStat}</Select.Item>
						{/each}
					</ScrollArea>
				</Select.Group>
			</Select.Content>
			<Select.Input name="favoriteFruit" />
		</Select.Root>
	</div>


	<Separator class="my-6" />
	<h1 class="font-bold">Display Settings</h1>
	<Label class="my-3">
		<span class="my-3 font-bold">Distance Unit</span>
		<RadioGroup.Root bind:value={$displaySettings.distanceUnit}>
			{#each DistanceUnitIterable as unit}
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={unit} id={`r${unit}`} />
					<Label for={`r${unit}`}>{unit}</Label>
				</div>
				<RadioGroup.Input name="distance" />
			{/each}
		</RadioGroup.Root>
	</Label>
	<Separator class="my-6" />
	<Label class="my-3">
		<span class="my-3 font-bold">Energy Unit</span>
		<RadioGroup.Root bind:value={$displaySettings.energyUnit}>
			{#each EnergyUnitIterable as unit}
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={unit} />
					<Label for={`r${unit}`}>{unit}</Label>
				</div>
				<RadioGroup.Input name="energy" />
			{/each}
		</RadioGroup.Root>
	</Label>
</div>