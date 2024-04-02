<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import { AppBar, AppShell, getModalStore, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import type { Modals } from '$lib/modals';
	import CalculatorModal from '$lib/components/modals/CalculatorModal.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import AboutModal from '$lib/components/modals/AboutModal.svelte';
	import NewModal from '$lib/components/modals/NewModal.svelte';
	import DisplaySettingsModal from '$lib/components/modals/DisplaySettingsModal.svelte';
	import ResupplySettingsModal from '$lib/components/modals/ResupplySettingsModal.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	const modalRegistry: Record<Modals, ModalComponent> = {
		calculator: { ref: CalculatorModal },
		new: { ref: NewModal },
		about: { ref: AboutModal },
		displaySettings: { ref: DisplaySettingsModal },
		resupplySettings: { ref: ResupplySettingsModal }
	};
	const modalStore = getModalStore();
	onMount(() => {
		modalStore.subscribe((modals) => {
			if (modals.length > 0) {
				document.body.classList.add('!overflow-hidden');
			} else {
				document.body.classList.remove('!overflow-hidden');
			}
		});
	})

</script>

<ModeWatcher />
<Modal components={modalRegistry} />
<Toast position="t" />
<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar class="font-heading-token">
			<svelte:fragment slot="lead">
				<img src="/hiker-hunger-app.svg" alt="Hiker Hunger" class="h-12 w-12" />
				<h1>Hiker Hunger</h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<MenuBar />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
