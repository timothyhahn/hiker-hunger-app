<script lang="ts">
	import Resupply from '$lib/components/resupply/Resupply.svelte';
	import { type DisplaySettings } from '$lib/settings';
	import { type Writable } from 'svelte/store';
	import { type Resupply as ResupplyType } from '$lib/resupply';
	import { onMount } from 'svelte';
	import { displaySettingsStore, resupplyStore, persistenceStore as persistence } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ResupplySettingsModal from '$lib/components/modals/ResupplySettingsModal.svelte';
	import { CURRENT_KEY, LocalStoragePersistence } from '$lib/persistence';

	const VERSION_KEY = '3';
	const DISPLAY_SETTINGS_KEY = `displaySettings-${VERSION_KEY}`;

	let displaySettings: Writable<DisplaySettings> = displaySettingsStore;
	let resupply: Writable<ResupplyType> = resupplyStore;
	let modalStore = getModalStore();
	let isNewUser = false;

	onMount(() => {
		persistence.set(new LocalStoragePersistence());
		if (localStorage.getItem(DISPLAY_SETTINGS_KEY)) {
			try {
				displaySettings.set(JSON.parse(localStorage.getItem(DISPLAY_SETTINGS_KEY)));
			} catch (err) {
				console.error('Failed to parse display settings from local storage', err);
			}
		}
		try {
			resupply.set($persistence.loadResupply(CURRENT_KEY));
		} catch (err) {
			isNewUser = true;
		}

		displaySettings.subscribe((value) => {
			localStorage.setItem(DISPLAY_SETTINGS_KEY, JSON.stringify(value));
		});

		resupply.subscribe((value) => {
			$persistence.saveResupply(CURRENT_KEY, value);
		});
	});

	$: if (isNewUser) {
		modalStore.trigger({type: 'component', component: {ref: ResupplySettingsModal, props: {isNewUser}}, meta: {isNewUser}});
	}
</script>

<main class="h-[100vh] w-full">
	<div class="container mx-auto space-y-8 p-8">
		<Resupply />
	</div>
</main>
