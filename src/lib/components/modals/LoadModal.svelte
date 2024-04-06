<script lang="ts">
	import { persistenceStore as persistence, resupplyStore } from '$lib/stores';
	import { X } from 'lucide-svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import { format } from '@formkit/tempo';
	import { newResupply } from '$lib/resupply.js';

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	export let parent: SvelteComponent;

	let resupplies = $persistence.listResupplies();

	function loadResupply(id: string) {
		const resupply = $persistence.loadResupply(id);
		resupplyStore.set(resupply);
		toastStore.trigger({ message: 'Resupply loaded' });
		modalStore.close();
	}

	function deleteResupply(id: string) {
		$persistence.deleteResupply(id);
		resupplyStore.set(newResupply());
		toastStore.trigger({ message: 'Resupply deleted' });
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4 max-h-[500px] overflow-y-scroll">
		<div class="flex justify-end">
			<button class="btn variant-link right-0" on:click={parent.onClose}>
				<X />
			</button>
		</div>
		<header class="text-2xl font-bold">Load/Delete Previous Resupplies</header>
		<article>
			<div class="table-container">
				<table class="table table-hover">
					<thead>
					<tr>
						<th>Name</th>
						<th>Created At</th>
						<th>Num Items</th>
						<th>Load</th>
						<th>Delete</th>
					</tr>
					</thead>
					<tbody>
					{#each resupplies as resupply}
						<tr>
							<td>{resupply.name || 'Unnamed'}</td>
							<td>{format(resupply.created_at, { date: 'medium', time: 'medium' })}</td>
							<td>{resupply.things.length} items</td>
							<td>
								<button class="btn" on:click={() => loadResupply(resupply.id)}>Load</button>
							</td>
							<td>
								<button class="btn btn-danger" on:click={() => deleteResupply(resupply.id)}>Delete</button>
							</td>
						</tr>
					{/each}
					</tbody>
				</table>
			</div>
		</article>
	</div>
{/if}