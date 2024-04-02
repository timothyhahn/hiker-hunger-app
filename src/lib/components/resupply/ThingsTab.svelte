<script lang="ts">
	import { iterableTrackables, Trackable } from '$lib/trackable.js';
	import { X } from 'lucide-svelte';
	import type { Writable } from 'svelte/store';
	import type { Resupply } from '$lib/resupply.js';
	import { resupplyStore } from '$lib/stores';
	import { Category } from '$lib/things';

	export let resupply: Writable<Resupply> = resupplyStore;

	function removeItem(id: string) {
		resupply.update((r) => {
			r.things = r.things.filter((t) => t.id !== id);
			return r;
		});
	}
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Delete</th>
				<th colspan="4" class="min-w-44">Name</th>
				<th>Quantity</th>
				<th>Category</th>
				{#each [Trackable.energy, Trackable.protein, Trackable.carbohydrates, Trackable.fat] as trackable}
					{#if $resupply[trackable]}
						<th>{trackable}</th>
						<th>Total {trackable}</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $resupply.things as thing (thing.id)}
				<tr>
					<td>
						<button on:click={() => removeItem(thing.id)}>
							<X />
						</button>
					</td>
					<td colspan="4"><input type="text" class="input" bind:value={thing.name} /></td>
					<td><input type="number" class="input" bind:value={thing.quantity} /></td>
					<td class="capitalize min-w-32">
						<select id="category" class="select" bind:value={thing.category}>
							<option value={null}>None</option>
							{#each Object.keys(Category) as category}
								<option value={category} class="capitalize">{Category[category]}</option>
							{/each}
						</select>
					</td>
					{#each iterableTrackables as trackable}
						{#if $resupply[trackable]}
							<th><input type="number" class="input" bind:value={thing[trackable]} /></th>
							<th>{(thing[trackable] || 0) * thing.quantity}</th>
						{/if}
					{/each}
				</tr>{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Totals</th>
				<td colspan="4">{$resupply.things.length}</td>
				<td>{$resupply.things.reduce((acc, thing) => acc + thing.quantity, 0)}</td>
				<td></td>
				{#each iterableTrackables as trackable}
					{#if $resupply[trackable]}
						<th>{$resupply.things.reduce((acc, thing) => acc + (thing[trackable] || 0), 0)}</th>
						<th
							>{$resupply.things.reduce(
								(acc, thing) => acc + (thing[trackable] || 0) * (thing.quantity || 0),
								0
							)}</th
						>
					{/if}
				{/each}
			</tr>
		</tfoot>
	</table>
</div>
