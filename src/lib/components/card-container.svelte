<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import { randRange } from '$lib/helpers/random';

	//TODO maybe a set?
	type T = $$Generic<{ id: number | string }>;
	interface $$Slots {
		card: {
			card: T;
			upcomingAction: 'left' | 'right' | undefined;
		};
	}
	export let cards: T[] = [];
	export let actions: {
		type: 'left' | 'right';
		id: number | string;
	}[] = [];

	let swipedCards: boolean[] = [];
</script>

<div class="container mx-auto place-content-center stack drop-shadow-md">
	{#each cards as card, idx (card.id)}
		<Card
			on:swipe={(e) => (actions = [...actions, e.detail])}
			id={card.id}
			bind:swiped={swipedCards[idx]}
			let:upcomingAction
			rotation={randRange(-6, 6)}
			isTop={swipedCards.findIndex((v) => !v) === idx}
		>
			<slot name="card" {card} {upcomingAction} />
		</Card>
	{/each}
</div>
