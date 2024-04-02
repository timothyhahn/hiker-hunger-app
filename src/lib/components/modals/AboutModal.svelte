<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { X } from 'lucide-svelte';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

</script>

{#if $modalStore[0]}
	<div class="bg-surface-100-800-token h-[90vh] p-4 overflow-y-scroll my-8">
		<div class="flex justify-end">
			<button class="btn variant-link right-0" on:click={parent.onClose}><X /></button>
		</div>
			<h2 class="h2 font-extrabold">About HikerHunger.app</h2>
			<p>Hiker Hunger, other than being that feeling when you can never <em>quite</em> get full on trail, is this app right here!</p>
			<p>This is primarily meant more for people who are on a longer hike, needing to get a quick resupply done, but don't know if they have "enough" for this next stretch.</p>
			<p>In Settings > Resupply, you can set how many days or miles until your next resupply. You can also pick what you want to track. All of this is optional.</p>
			<p>In Settings > Display, you can choose your preferred units, as well as the main stat you care about.</p>
			<p>On the main screen, as you shop or as you spread out your goods on the side of the road, add items and whatever information is important about said item.</p>
			<p>Pretty much every field is optional, in case you're in a hurry or can't be bothered to label every flavor of Poptarts.</p>
			<p>Add the item and the summary at the bottom will let you know what your running total is, based on what the "main stat you care about" is set to.</p>
			<p>Tap the summary bar at the bottom, and toggle between seeing your stats, or a table of items.</p>
			<!--SOON: <p>You can save resupplies to your browser's local memory. If you're on mobile Safari, note that iOS does not guarantee things will stay saved if you don't interact with this site for more than 7 days.</p> -->
			<p>TODO:</p>
			<ul class="list-disc list-inside">
				<li>A mobile app for Android/iOS to make saving locally easier</li>
				<li>The ability to export your data</li>
				<li>Lil bug fixes here and there, I'm sure.</li>
			</ul>

			<p>Made with 🤔 by <a href="https://github.com/timothyhahn/hiker-hunger-app" class="text-primary-900-50-token">Jeeves</a></p>
			<button class="btn variant-filled" on:click={parent.onClose}>Got it</button>
	</div>
{/if}

<style>
	p {
			margin-bottom: 1rem;
	}
</style>