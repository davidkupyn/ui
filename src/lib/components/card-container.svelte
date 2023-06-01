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

<div class="container mx-auto place-content-center stack drop-shadow-md">
	{#each cards as card, idx}
		<Card
			on:swipe={(e) => (actions = [...actions, e.detail])}
			id={card.id}
			let:upcomingAction
			rotation={idx & 1 ? -2 : 2}
		>
			<slot name="card" {card} {upcomingAction} />
		</Card>
	{/each}
</div>
