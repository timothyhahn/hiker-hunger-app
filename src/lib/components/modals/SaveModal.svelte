<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { resupplyStore as resupply, persistenceStore as persistence } from '$lib/stores';

	export let parent: SvelteComponent;
	const modalStore = getModalStore();

	function onConfirm(): void {
		$persistence.saveResupply($resupply.id, $resupply);
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">Save your Resupply</header>
		<article>
			<p>Save your Resupply for later use.</p>
			<p><input type="text" class="input" placeholder="Resupply Name (optional, but recommended)"
								bind:value={$resupply.name} /></p>
		</article>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onConfirm}>Confirm</button>
		</footer>
	</div>
{/if}c