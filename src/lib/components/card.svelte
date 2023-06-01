<script lang="ts">
	import { browser } from '$app/environment';
	import { draggable } from '@neodrag/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	export let id: number | string = 0;

	const dispatch = createEventDispatcher();
	let position = spring({ x: 0, y: 0 }, { damping: 0.8, stiffness: 0.15 });
	export let active = true;
	export function swipeAction(type: 'left' | 'right') {
		$position = {
			x: type === 'left' ? -1200 : 1200,
			y: $position.y
		};
		dispatch('swipe', {
			type,
			id
		});
		if (browser) position.stiffness = window.innerWidth > 768 ? 0.2 : 0.04;
		setTimeout(() => {
			active = false;
		}, 150);
	}

	export function resetSwipe() {
		active = true;
		$position = { x: 0, y: 0 };
		position.stiffness = 0.15;
		upcomingAction = undefined;
	}

	let upcomingAction: 'left' | 'right' | undefined;
	let bound = 150;

	onMount(() => {
		if (browser) {
			bound = window.innerWidth > 768 ? 150 : 50;
		}
	});
</script>

{#if active}
	<div
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
		<div style="transform: rotate({$position.x * 0.02}deg)">
			<slot {upcomingAction} />
		</div>
	</div>
{/if}
