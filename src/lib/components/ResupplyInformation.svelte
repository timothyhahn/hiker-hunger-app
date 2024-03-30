<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Separator } from '$lib/components/ui/select';

	import { Button } from '$lib/components/ui/button';
	import { ChevronsDownUp, ChevronsUpDown } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { type DisplaySettings, Trackable } from '$lib/settings';
	import type { Resupply } from '$lib/resupply';
	import { getTrackableLabel } from '$lib/utils';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Input } from '$lib/components/ui/input';

	export let resupply: Resupply;
	export let displaySettings: DisplaySettings;
	let expanded = false;

	const dispatch = createEventDispatcher<{
		clearAll: null;
		toggleTracked: { trackable: Trackable };
		updateDaysToNext: number;
		updateDistanceToNext: number;
	}>();

	function clearAll() {
		dispatch('clearAll');
	}

	function toggleTracked(trackable: Trackable) {
		dispatch('toggleTracked', { trackable });
	}

	function updateDaysToNext(days: number) {
		dispatch('updateDaysToNext', parseInt(days, 10));
	}

	function updateDistanceToNext(distance: number) {
		dispatch('updateDistanceToNext', parseInt(distance, 10));
	}
</script>

<Card.Root class="fixed bottom-0 w-full rounded-b-none">
	<Collapsible.Root bind:open={expanded}>
		<Card.Header>
			<Card.Title>
				<div class="flex justify-between">
					<div class="flex-1">Summary</div>
					<div class="flex flex-row">
						<Collapsible.Trigger>
							<Button variant="outline" class="mr-4">
								{#if expanded}
									<ChevronsDownUp />
								{:else}
									<ChevronsUpDown />
								{/if}
							</Button>
						</Collapsible.Trigger>

						<AlertDialog.Root>
							<AlertDialog.Trigger>
								<Button variant="secondary">Clear</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<AlertDialog.Title>Are you sure?</AlertDialog.Title>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									<AlertDialog.Action on:click={clearAll}>Continue</AlertDialog.Action>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
				</div>
			</Card.Title>
		</Card.Header>

		<Card.Content>
			{#each resupply.tracked.keys() as trackable}
				<div>
					<span class="font-extrabold"
						>Total {trackable.toLowerCase()}
						:</span
					>
					{resupply.totals[trackable].toLocaleString()}
					{trackable === Trackable.energy ? getTrackableLabel(displaySettings, trackable) : 'mg'}
				</div>
			{/each}
			{#if resupply.daysToNextResupply}
				<Separator />
				{#each resupply.tracked.keys() as trackable}
					<div>
						<span class="font-extrabold"
							>Daily {trackable.toLowerCase()}
							:</span
						>
						{Math.floor(resupply.totals[trackable] / resupply.daysToNextResupply).toLocaleString()}
						{trackable === Trackable.energy ? getTrackableLabel(displaySettings, trackable) : 'mg'}
					</div>
				{/each}
			{/if}
			{#if resupply.distanceToNextResupply}
				<Separator />
				{#each resupply.tracked.keys() as trackable}
					<div>
						<span class="font-extrabold"
							>Per {displaySettings.distanceUnit.toString().toLowerCase().slice(0, -1)}
							{trackable.toLowerCase()}
							:</span
						>
						{Math.floor(
							resupply.totals[trackable] / resupply.distanceToNextResupply
						).toLocaleString()}
						{trackable === Trackable.energy ? getTrackableLabel(displaySettings, trackable) : 'mg'}
					</div>
				{/each}
			{/if}
		</Card.Content>
		<Collapsible.Content class="p-6">
			<ScrollArea class="h-[250px]">
				<Separator />
				<h1 class="font-bold">What to track?</h1>
				{#each Object.values(Trackable) as trackable}
					<div>
						<Checkbox
							id="terms"
							checked={resupply.tracked.has(trackable)}
							aria-labelledby="terms-label"
							on:click={() => toggleTracked(trackable)}
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
				<div class="mx-3">
					<Label for="daysToNext">Days until next resupply</Label>
					<Input
						id="daysToNext"
						type="number"
						value={resupply.daysToNextResupply}
						on:input={(v) => updateDaysToNext(v.target.valueAsNumber)}
					/>
				</div>
				<div class="mx-3">
					<Label for="distanceToNext">
						{displaySettings.distanceUnit} to next resupply
					</Label>
					<Input
						id="distanceToNext"
						type="number"
						value={resupply.distanceToNextResupply}
						on:input={(v) => updateDistanceToNext(v.target.valueAsNumber)}
					/>
				</div>
			</ScrollArea>
		</Collapsible.Content>
	</Collapsible.Root>
</Card.Root>
