<script lang="ts" context="module">
	type SwipeAction = (type: 'left' | 'right') => void;
	export const swipeDispatcher = createDispatcher<SwipeAction>();
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { createDispatcher } from '$lib/helpers/createDispatcher';
	import { draggable } from '@neodrag/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	const dispatch = createEventDispatcher();

	let position = spring({ x: 0, y: 0 }, { damping: 0.4, stiffness: 0.15 });
	let active = true;

	export let id: number | string = 0;
	export let swiped = false;
	export let rotation = 0;
	export let isTop = false;

	swipeDispatcher.addListenerOnMount((type) => {
		if (!isTop) return;
		swipeAction(type);
	});

	function swipeAction(type: 'left' | 'right') {
		dispatch('swipe', {
			type,
			id
		});

		$position = {
			x: type === 'left' ? -800 : 800,
			y: $position.y
		};
		if (browser && upcomingAction) position.stiffness = window.innerWidth > 768 ? 0.2 : 0.04;
		swiped = true;
		setTimeout(() => {
			active = false;
		}, 75);
	}

	function resetSwipe() {
		active = true;
		swiped = false;
		$position = { x: 0, y: 0 };
		position.stiffness = 0.15;
		upcomingAction = undefined;
	}

	let upcomingAction: 'left' | 'right' | undefined;
	let bound = 150;

	let dragging = false;

	onMount(() => {
		if (browser) {
			bound = window.innerWidth > 768 ? 150 : 50;
		}
	});
</script>

{#if active}
	<div
		on:mousedown={() => {
			dragging = true;
		}}
		on:mouseup={() => {
			dragging = false;
		}}
		use:draggable={{
			position: $position,
			bounds: { top: 80, bottom: 80, left: -1200, right: -1200 },

			onDrag: (data) => {
				upcomingAction =
					data.offsetX > bound ? 'right' : data.offsetX < -bound ? 'left' : undefined;
				$position = { x: data.offsetX, y: data.offsetY };
			},
			onDragEnd: () => {
				if ($position.x > bound || $position.x < -bound) {
					swipeAction($position.x > bound ? 'right' : 'left');
				} else {
					resetSwipe();
				}
			}
		}}
	>
		<div
			style="transform: rotate({$position.x * 0.02 + rotation}deg)"
			class={dragging ? 'cursor-grabbing' : 'cursor-grab'}
		>
			<slot {upcomingAction} />
		</div>
	</div>
{/if}
