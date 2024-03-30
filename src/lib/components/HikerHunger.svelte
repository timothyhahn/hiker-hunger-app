<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Sheet from '$lib/components/ui/sheet';
	import Resupply from '$lib/components/Resupply.svelte';
	import HikerHungerSettings from '$lib/components/HikerHungerSettings.svelte';
	import { Gear } from 'svelte-radix';
	import { DistanceUnit, EnergyUnit, type DisplaySettings } from '$lib/settings';
	import { Menu, Plus } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { persisted } from 'svelte-persisted-store';

	const displaySettings = persisted('displaySettings', {
		distanceUnit: DistanceUnit.mi,
		energyUnit: EnergyUnit.kcal
	});

	function updateDisplaySettings(event: CustomEvent<DisplaySettings>) {
		displaySettings.set(event.detail);
	}
</script>

<main class="h-[100vh] w-full">
	<Sheet.Root>
		<div class="p-6">
			<div class="flex justify-between">
				<div class="flex">
					<Sheet.Trigger>
						<Menu />
					</Sheet.Trigger>
					<div class="ml-3 font-extrabold">Hiker Hunger</div>
				</div>

				<Dialog.Root>
					<Dialog.Trigger>
						<Gear />
					</Dialog.Trigger>
					<Dialog.Content>
						<HikerHungerSettings
							displaySettings={$displaySettings}
							on:updateDisplaySettings={updateDisplaySettings}
						/>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>

		<div class="my-6">
			<Resupply displaySettings={$displaySettings} />
		</div>
		<Sheet.Content side="left" class="w-full !max-w-full text-left">
			<Sheet.Header>
				<Sheet.Title>What is Hiker Hunger?</Sheet.Title>
				<Sheet.Description class="overflow-scroll text-left">
					<ScrollArea class="h-[80vh]">
						<p class="my-3">
							It's that feeling you get, when you can never get satisfied with the food you're
							carrying and...
						</p>
						<p class="my-3">Oh, this website?</p>
						<p class="my-3">
							Well, it's a tool to help you plan your resupply strategy for a long-distance hike.
						</p>
						<p class="my-3">
							In that, if you're anything like me, you're trying to figure out if you put enough
							Poptarts into your shopping cart, since you're supposed to be hitching out in like 2
							hours.
						</p>
						<p class="my-3">
							As you're resupplying, add the calories (or other macros) the item you're planning to
							add to your pack in the appropriate input boxes.
						</p>
						<p class="my-3">
							If you need to convert serving sizes, I have added a calculator you can use and update
							the input box with.
						</p>
						<p clas="my-3">
							Click the appropriate
							<Plus class="inline" />
							button to add the item to your running total.
						</p>
						<p class="my-3">You can also change the units of measurement to suit your needs.</p>
						<p class="my-3">As you add items, the total at the bottom will change.</p>
						<p class="my-3">
							Feel free to also add the number of days you plan to be out, or the number of miles
							till your next resupply.
						</p>
						<p class="my-3">Happy Hiking!</p>
						<div class="my-12 font-light">
							Made with 🤔 by
							<Button variant="link" href="https://github.com/timothyhahn/hiker-hunger-app"
								>Jeeves</Button
							>
						</div>
						<Separator />
						<div class="my-2">
							TODO:
							<ul class="list-inside list-disc space-y-1 text-gray-500">
								<li>The ability to locally "save" resupplies and reload them later.</li>
								<li>
									The calculator was done super hastily and needs more testing/bug-bashing probably.
								</li>
								<li>Make this a proper PWA/mobile app if for some reason you need offline use.</li>
								<li>I dunno, you tell me.</li>
							</ul>
						</div>
					</ScrollArea>
				</Sheet.Description>
			</Sheet.Header>
		</Sheet.Content>
	</Sheet.Root>
</main>
