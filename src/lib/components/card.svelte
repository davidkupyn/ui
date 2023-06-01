<script lang="ts">
	import { browser } from '$app/environment';
	import { draggable } from '@neodrag/svelte';
	import { createEventDispatcher } from 'svelte';
	import { spring } from 'svelte/motion';
	export let id: number | string = 0;

	const dispatch = createEventDispatcher();
	let position = spring({ x: 0, y: 0 }, { damping: 1, stiffness: 0.15 });
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
		if (browser) position.stiffness = window.innerWidth > 768 ? 0.2 : 0.05;
		setTimeout(() => {
			active = false;
		}, 150);
	}

	export function resetSwipe() {
		active = true;
		$position = { x: 0, y: 0 };
		position.stiffness = 0.15;
		outOfBound = false;
	}

	let outOfBound = false;
	const bound = 150;
</script>

{#if active}
	<div
		use:draggable={{
			position: $position,
			bounds: { top: 80, bottom: 80, left: -1200, right: -1200 },

			onDrag: (data) => {
				outOfBound = data.offsetX > bound || data.offsetX < -bound;
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
			<slot {outOfBound} />
		</div>
	</div>
{/if}
