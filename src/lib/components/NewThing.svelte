<script lang="ts">
	import { Category, newThing, type Thing } from '$lib/things';
	import { derived, type Readable, type Writable, writable } from 'svelte/store';
	import { type DisplaySettings } from '$lib/settings';
	import { iterableTrackables, Trackable } from '$lib/trackable';

	import type { Resupply } from '$lib/resupply';
	import { CalculatorIcon } from 'lucide-svelte';
	import { displaySettingsStore, resupplyStore } from '$lib/stores';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { Modals } from '$lib/modals';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	let displaySettings: Readable<DisplaySettings> = displaySettingsStore;
	let resupply: Writable<Resupply> = resupplyStore;
	let thingCount = derived(resupply, ($resupply) => $resupply.things.length);

	let thing: Writable<Thing> = writable(structuredClone(newThing()));

	function addThing() {
		if (!$thing.name) {
			$thing.name = `Thing ${$thingCount}`;
		}

		if ($thing.quantity < 1) {
			toastStore.trigger({
				message: 'Quantity must be a positive number.',
				background: 'variant-filled-error'
			});
			return;
		}

		let hasError = false;
		iterableTrackables.forEach(
			(trackable) => {
				if ($thing[trackable] && $thing[trackable] < 0) {
					toastStore.trigger({
						message: `${trackable} must be a positive number.`,
						background: 'variant-filled-error'
					});
					hasError = true;
				}
			}
		);

		if (hasError) {
			return;
		}

		// Save these values before updating the thing
		const thingName = $thing.name;
		const category = $thing.category;

		thing.update(($thing) => {
			resupply.update(($resupply) => {
				$resupply.things.push($thing);
				return $resupply;
			});
			return structuredClone(newThing());
		});

		$thing.category = category;
		toastStore.trigger({
			message: `Added ${thingName} to your resupply.`,
			background: 'variant-filled-success'
		});
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addThing();
		}
	}

	function updateValue(
		response: boolean | undefined | { value: number | undefined },
		trackable: Trackable
	) {
		if (response === undefined || typeof response === 'boolean') {
			return;
		}
		let { value } = response;
		if (value === undefined) {
			return;
		}
		thing.update(($thing) => {
			$thing[trackable] = value || null;
			return $thing;
		});
	}

	function openCalculator(trackable: Trackable) {
		modalStore.trigger({
			type: 'component',
			component: Modals.calculator,
			response: (r) => updateValue(r, trackable)
		});
	}
</script>

<div class="card mx-auto w-[320px] md:w-[480px] lg:w-[640px]">
	<header class="card-header">
		<div class="font-bold">Add Something To Your Resupply</div>
		<div>Choose what you want to track about each thing in the settings menu.</div>
	</header>
	<section class="p-4">
		<div class="grid w-full items-center gap-4">
			<div class="flex flex-col space-y-1.5">
				<label for="name" class="font-bold">Name</label>
				<input id="name" class="input" placeholder="Thing {$thingCount}" bind:value={$thing.name} />
			</div>
			<div class="flex flex-col space-y-1.5">
				<label for="quantity" class="font-bold">Quantity</label>
				<input id="quantity" class="input" bind:value={$thing.quantity} type="number" />
			</div>
			<div class="flex flex-col space-y-1.5">
				<label for="category" class="font-bold">Category</label>
				<select id="category" class="select" bind:value={$thing.category}>
					<option value={null}>None</option>
					{#each Object.keys(Category) as category}
						<option value={category} class="capitalize">{Category[category]}</option>
					{/each}
				</select>
			</div>
			{#each iterableTrackables as trackable}
				{#if $resupply[trackable]}
					<div class="flex flex-col space-y-1.5">
						<label for={trackable} class="font-bold">
							{trackable === Trackable.energy ? $displaySettings.energyUnit : trackable}
						</label>
						<div class="flex">
							<input
								id={trackable}
								class="input flex-1"
								bind:value={$thing[trackable]}
								on:keypress={handleKeyPress}
								type="number"
							/>
							<button on:click={() => openCalculator(trackable)}>
								<CalculatorIcon />
							</button>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>
	<footer class="card-footer flex justify-between">
		<button type="button" class="variant-filled-primary btn" on:click={addThing}>Add</button>
	</footer>
</div>
