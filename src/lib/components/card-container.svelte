<script lang="ts">
	import Card from '$lib/components/card.svelte';

	export let actions: {
		type: 'left' | 'right';
		id: number | string;
	}[] = [];

	type T = $$Generic<{ id: number | string }>;
	interface $$Slots {
		card: {
			card: T;
			upcomingAction: 'left' | 'right' | undefined;
		};
	}
	export let cards: T[] = [];
</script>

<div class="container mx-auto grid place-content-center stack">
	{#each cards as card}
		<Card on:swipe={(e) => (actions = [...actions, e.detail])} id={card.id} let:upcomingAction>
			<slot name="card" {card} {upcomingAction} />
		</Card>
	{/each}
</div>
