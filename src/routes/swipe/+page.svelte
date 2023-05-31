<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	let position = tweened(
		{
			x: 0,
			y: 0
		},
		{ easing: expoOut, duration: 600 }
	);
	function swipeAction(type: 'left' | 'right') {
		if (type === 'left') {
			console.log('left');
		} else {
			console.log('right');
		}
	}
	let outOfBound = false;
	const bound = 300;
</script>

<main class="h-[90vh] mx-auto max-w-4xl grid place-content-center overflow-hidden">
	<div
		use:draggable={{
			axis: 'x',
			position: $position,
			onDrag: (data) => {
				if (data.offsetX > bound || data.offsetX < -bound) {
					outOfBound = true;
				} else {
					outOfBound = false;
				}
				position.set({ x: data.offsetX, y: data.offsetY }, { duration: 0 });
			},
			onDragEnd: () => {
				if ($position.x > bound) {
					position.set({ x: 1200, y: 0 }, { duration: 1200 });
					swipeAction('right');
				} else if ($position.x < -bound) {
					position.set({ x: -1200, y: 0 }, { duration: 1200 });
					swipeAction('left');
				} else {
					$position = { x: 0, y: 0 };
				}
			}
		}}
		class="h-96 w-72 rounded-2xl grid place-content-center text-semibold {outOfBound
			? 'bg-primary-500 dark:bg-primary-400'
			: 'bg-primary-200 dark:bg-primary-800'} transition-colors"
	>
		Swipeable element
	</div>
</main>
