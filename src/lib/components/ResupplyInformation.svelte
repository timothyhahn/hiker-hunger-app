<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';

	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, ChevronUp, SquareX } from 'lucide-svelte';
	import { type Writable } from 'svelte/store';
	import { PrimaryStat, type Resupply } from '$lib/resupply';
	import { type DisplaySettings, Trackable } from '$lib/settings';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';

	export let resupply: Writable<Resupply>;
	export let displaySettings: DisplaySettings;

	function clearAll() {
		resupply.update((resupply) => {
			resupply.things = [];
			return resupply;
		});
	}

	let expanded = false;

	$: primaryStat = displaySettings.primaryStat;

	function getPrimaryStatValue(resupply: Resupply, primaryStat: PrimaryStat) {
		switch (primaryStat) {
			case PrimaryStat.numItems:
				return `${resupply.things.length} items`;
			case PrimaryStat.totalCalories:
				return `${resupply.things.reduce((acc, thing) => acc + (thing.energy || 0) * thing.quantity, 0)} ${displaySettings.energyUnit}`;
			case PrimaryStat.totalProtein:
				return `${resupply.things.reduce((acc, thing) => acc + (thing.protein || 0) * thing.quantity, 0)} mg`;
			case PrimaryStat.totalFat:
				return `${resupply.things.reduce((acc, thing) => acc + (thing.fat || 0) * thing.quantity, 0)} mg`;
			case PrimaryStat.totalCarbs:
				return `${resupply.things.reduce((acc, thing) => acc + (thing.carbohydrates || 0) * thing.quantity, 0)} mg`;
			case PrimaryStat.caloriesPerDay:
				if (resupply.daysToNextResupply === null) return 'Unknown number of days to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.energy || 0) * thing.quantity, 0) / resupply.daysToNextResupply} ${displaySettings.energyUnit}/day`;
			case PrimaryStat.proteinPerDay:
				if (resupply.daysToNextResupply === null) return 'Unknown number of days to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.protein || 0) * thing.quantity, 0) / resupply.daysToNextResupply} mg/day`;
			case PrimaryStat.carbsPerDay:
				if (resupply.daysToNextResupply === null) return 'Unknown number of days to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.carbohydrates || 0) * thing.quantity, 0) / resupply.daysToNextResupply} mg/day`;
			case PrimaryStat.fatPerDay:
				if (resupply.daysToNextResupply === null) return 'Unknown number of days to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.fat || 0) * thing.quantity, 0) / resupply.daysToNextResupply} mg/day`;
			case PrimaryStat.caloriesPerMile:
				if (resupply.distanceToNextResupply === null) return 'Unknown distance to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.energy || 0) * thing.quantity, 0) / resupply.distanceToNextResupply} ${displaySettings.energyUnit}/${displaySettings.distanceUnit}`;
			case PrimaryStat.proteinPerMile:
				if (resupply.distanceToNextResupply === null) return 'Unknown distance to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.protein || 0) * thing.quantity, 0) / resupply.distanceToNextResupply} mg/${displaySettings.distanceUnit}`;
			case PrimaryStat.carbsPerMile:
				if (resupply.distanceToNextResupply === null) return 'Unknown distance to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.carbohydrates || 0) * thing.quantity, 0) / resupply.distanceToNextResupply} mg/${displaySettings.distanceUnit}`;
			case PrimaryStat.fatPerMile:
				if (resupply.distanceToNextResupply === null) return 'Unknown distance to next resupply';
				return `${resupply.things.reduce((acc, thing) => acc + (thing.fat || 0) * thing.quantity, 0) / resupply.distanceToNextResupply} mg/${displaySettings.distanceUnit}`;
		}
	}

	function removeThing(idx: number) {
		resupply.update((resupply) => {
			resupply.things.splice(idx, 1);
			return resupply;
		});
	}
</script>

<Card.Root class="fixed bottom-0 w-full rounded-b-none p-1">
	<Collapsible.Root bind:open={expanded}>
		<Card.Header class="p-1">
			<Card.Title>
				<Collapsible.Trigger class="w-full text-left">
					<div class="flex justify-between">
						<div class="flex-1 my-auto">
							{getPrimaryStatValue($resupply, primaryStat)}
						</div>
						<div class="flex flex-row">
							<Button variant="ghost" class="mr-4">
								{#if expanded}
									<ChevronDown />
								{:else}
									<ChevronUp />
								{/if}
							</Button>

							<AlertDialog.Root>
								<AlertDialog.Trigger>
									<Button variant="secondary">Clear</Button>
								</AlertDialog.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>
											Are you sure?
											<div>
												This will completely reset the resupply.
											</div>
										</AlertDialog.Title>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
										<AlertDialog.Action on:click={clearAll}>Continue</AlertDialog.Action>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</div>
					</div>
				</Collapsible.Trigger>
			</Card.Title>
		</Card.Header>
		<Collapsible.Content class="p-3">
			<div class="h-[75vh] overflow-y-scroll">
				<div>
					{#each Object.keys(PrimaryStat) as stat}
						<!-- The single letters off are for case insensitivity, lol -->
						{#if stat.includes('alories') && $resupply[Trackable.energy]}
							<div>
								<div class="font-bold">{PrimaryStat[stat]}:</div>
								{getPrimaryStatValue($resupply, PrimaryStat[stat])}
							</div>
						{:else if stat.includes('rotein') && $resupply[Trackable.protein]}
							<div>
								<div class="font-bold">{PrimaryStat[stat]}:</div>
								{getPrimaryStatValue($resupply, PrimaryStat[stat])}
							</div>
						{:else if (stat.includes('fat') || stat.includes('Fat')) && $resupply[Trackable.fat]}
							<div>
								<div class="font-bold">{PrimaryStat[stat]}:</div>
								{getPrimaryStatValue($resupply, PrimaryStat[stat])}
							</div>
						{:else if stat.includes('carbs') && $resupply[Trackable.carbohydrates] }
							<div>
								<div class="font-bold">{PrimaryStat[stat]}:</div>
								{getPrimaryStatValue($resupply, PrimaryStat[stat])}
							</div>
						{:else if stat.includes('numItems')}
							<div>
								<div class="font-bold">{PrimaryStat[stat]}:</div>
								{getPrimaryStatValue($resupply, PrimaryStat[stat])}
							</div>
						{/if}
					{/each}
				</div>
				<Separator class="my-3" />
				<div class="font-bold">Items:</div>
				{#each $resupply.things as thing, idx}
					<Card.Root class="p-3">
						<Card.Title>
							<div class="flex justufy-between">
								<div class="flex-1">
									{thing.name} x {thing.quantity}
								</div>

								<div class="">
									<Button variant="ghost" class="mx-auto" on:click={() => removeThing(idx)}>
										<SquareX />
									</Button>
								</div>
							</div>
						</Card.Title>
						<Card.Content>
							<div class="flex flex-col">
								{#each Object.keys(Trackable) as trackable}
									{#if $resupply[Trackable[trackable]] == true}
										<div>
											<span class="font-bold">{Trackable[trackable]}:</span>
											{(thing[trackable] || 0) * thing.quantity}
										</div>
									{/if}
								{/each}
							</div>
						</Card.Content>
						<Card.Footer class="w-full">
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
</Card.Root>
