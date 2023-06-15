<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import { randRange } from '$lib/helpers/random';

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
	let topIdx = 0;
	$: topIdx = swipedCards.findIndex((v) => !v);
	let splicedCards = [...cards];
	$: console.log(splicedCards.splice(topIdx, topIdx + 10));
</script>

<div class="stack">
	{#each cards as card, idx (card.id)}
		<Card
			on:swipe={(e) => (actions = [...actions, e.detail])}
			id={card.id}
			bind:swiped={swipedCards[idx]}
			let:upcomingAction
			rotation={randRange(-4, 4)}
			isTop={topIdx === idx}
		>
			<slot name="card" {card} {upcomingAction} />
		</Card>
	{/each}
</div>
