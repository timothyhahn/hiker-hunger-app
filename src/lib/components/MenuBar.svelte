<script lang="ts">
	import { getModalStore, ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Modals } from '$lib/modals';

	let comboboxValue: string;
	let modalStore = getModalStore();

	const fileMenu: PopupSettings = {
		event: 'click',
		target: 'fileMenu',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
	const settingsMenu: PopupSettings = {
		event: 'click',
		target: 'settingsMenu',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	function openModal(modal: Modals) {
		modalStore.trigger({ type: 'component', component: modal });
	}
</script>

<!-- Top level menu -->
<div class="variant-filled btn-group">
	<button class="btn btn-sm" use:popup={fileMenu}>File</button>
	<button class="btn btn-sm" use:popup={settingsMenu}>Settings</button>
</div>

<!-- File Menu -->
<div class="card w-48 py-2 shadow-xl" data-popup="fileMenu">
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={comboboxValue} name="small" value="new" on:click={() => openModal(Modals.new)}>New
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="small" value="save" on:click={() => openModal(Modals.save)}>Save
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="small" value="load" on:click={() => openModal(Modals.load)}>Load
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="small" value="about" on:click={() => openModal(Modals.about)}>About
		</ListBoxItem>
	</ListBox>
	<div class="bg-surface-100-800-token arrow" />
</div>

<!-- Settings Menu -->
<div class="card w-48 py-2 shadow-xl" data-popup="settingsMenu">
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={comboboxValue} name="small" value="resupply"
								 on:click={() => openModal(Modals.resupplySettings)}>Resupply
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="small" value="display"
								 on:click={() => openModal(Modals.displaySettings)}>Display
		</ListBoxItem>
	</ListBox>
	<div class="bg-surface-100-800-token arrow" />
</div>
