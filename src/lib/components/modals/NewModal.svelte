<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { resupplyStore} from '$lib/stores';
	import { newResupply } from '$lib/resupply.js';

	export let parent: SvelteComponent;
	const modalStore = getModalStore();
	const resupply = resupplyStore;

	function onConfirm(): void {
		resupply.set(newResupply());
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">Are you sure you want to create a new resupply?</header>
		<article>
			This will clear your resupply and create a new one
		</article>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onConfirm}>Confirm</button>
		</footer>
	</div>
{/if}c