<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import CardContainer from '$lib/components/card-container.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { cn } from '$lib/helpers/style';
	import { swipeDispatcher } from '$lib/components/card.svelte';
	import Badge from '$lib/ui/badge.svelte';
	import Button from '$lib/ui/button.svelte';

	let actions: { type: 'left' | 'right'; id: number | string }[] = [];
	let reset = 0;

	let cards = Array.from({ length: 16 }, (_, i) => ({ id: i + 1, name: `Card ${i + 1}` }));
	let swipeNextCard = swipeDispatcher.dispatch;
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') swipeNextCard('left');
		if (e.key === 'ArrowRight') swipeNextCard('right');
	}}
/>

<main class="h-[90vh] grid place-content-center w-full overflow-hidden">
	<div class="h-96">
		{#key reset}
			<div in:fade={{ duration: 150 }}>
				<CardContainer bind:cards bind:actions>
					<div
						slot="card"
						let:card
						class={cn(
							'[box-shadow:_inset_0_1px_2px_0px_hsl(0_0%_100%/0.2)] grid bg-background place-content-center transition ease-out rounded-2xl w-72 h-96',
						)}
					>
						{card.name}
					</div>
				</CardContainer>
			</div>
		{/key}
	</div>
	<div class="mt-12 mb-4 flex gap-4 mx-auto">
		<Button variant="secondary" size="icon" on:click={() => swipeNextCard('left')}>
			<ArrowLeft size=20 />
		</Button>
		<Button variant="secondary" size="icon" on:click={() => swipeNextCard('right')}>
			<ArrowRight size=20 />
		</Button>
	</div>
	<Button
		variant="secondary"
		size="icon"
		class="mb-12 w-[5.5rem] mx-auto"
		on:click={() => {
			actions = [];
			reset++;
		}}
	>
		Reset
	</Button>
	<div class="flex flex-wrap gap-2 max-w-xs">
		{#each actions as action}
			<span in:scale>
				<Badge subtle variant={action.type === 'left' ? 'error' : 'success'}>
				Card {action.id}
				</Badge>
			</span>
		{:else}
			<span in:scale class="mx-auto">
				<Badge subtle variant='info'>No actions</Badge>
			</span>
		{/each}
	</div>
</main>
