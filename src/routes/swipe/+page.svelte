<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import CardContainer from '$lib/components/card-container.svelte';

	let actions: { type: 'left' | 'right'; id: number | string }[] = [];
	let reset = 0;
</script>

<main class="h-[90vh] grid place-content-center w-full overflow-hidden">
	<div class="h-96">
		{#key reset}
			<div in:fade={{ duration: 150 }}>
				<CardContainer
					cards={[
						{ id: 1, name: 's' },
						{ id: 2, name: 's' },
						{ id: 3, name: 's' },
						{ id: 4, name: 's' }
					]}
					bind:actions
				>
					<div
						slot="card"
						let:upcomingAction
						class="cursor-grab convex grid place-content-center border {upcomingAction === 'left'
							? 'border-red-500 dark:border-red-400'
							: upcomingAction === 'right'
							? 'border-green-500 dark:border-green-400'
							: 'border-transparent'} transition ease-out rounded-2xl w-72 h-96"
						let:card
					>
						Card {card.id}
					</div>
				</CardContainer>
			</div>
		{/key}
	</div>

	<button
		class="my-8 btn btn-secondary w-[6.25rem] mx-auto"
		on:click={() => {
			actions = [];
			reset++;
		}}
		>Reset
	</button>
	<div class="flex flex-wrap gap-2 justify-center">
		{#each actions as action}
			<span
				in:scale|local
				class="badge {action.type === 'left' ? 'badge-danger' : 'badge-success'}"
			>
				Card {action.id}
			</span>
		{:else}
			<span class="badge badge-outline"> No actions </span>
		{/each}
	</div>
</main>
