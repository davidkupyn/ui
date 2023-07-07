<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import CardContainer from '$lib/components/card-container.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { cn } from '$lib/helpers/style';
	import { swipeDispatcher } from '$lib/components/card.svelte';
	import Select from '$lib/ui/select/select.svelte';

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
						let:upcomingAction
						let:card
						class={cn(
							'convex grid bg-background place-content-center border border-muted',
							upcomingAction === 'left' && 'border-error-500 dark:border-error-600',
							upcomingAction === 'right' && 'border-success-500 dark:border-success-600',
							'transition ease-out rounded-2xl w-72 h-96'
						)}
					>
						{card.name}
					</div>
				</CardContainer>
			</div>
		{/key}
	</div>
	<div class="mt-12 mb-4 flex gap-4 mx-auto">
		<button class="btn btn-secondary btn-icon" on:click={() => swipeNextCard('left')}>
			<ArrowLeft size={20} />
		</button>
		<button class="btn btn-secondary btn-icon" on:click={() => swipeNextCard('right')}>
			<ArrowRight size={20} />
		</button>
	</div>
	<button
		class="mb-12 btn btn-secondary w-[5.5rem] mx-auto"
		on:click={() => {
			actions = [];
			reset++;
		}}
	>
		Reset
	</button>
	<div class="flex flex-wrap gap-2 max-w-xs">
		{#each actions as action}
			<span in:scale class="badge {action.type === 'left' ? 'badge-error' : 'badge-success'}">
				Card {action.id}
			</span>
		{:else}
			<span in:scale class="badge badge-outline mx-auto"> No actions </span>
		{/each}
	</div>
	<Select placeholder="Select component" let:Option class="mt-12">
		<Option value="thomas">Thomas</Option>
		<Option value="hunter">Hunter</Option>
		<Option value="dave">Dave</Option>
	</Select>
</main>
