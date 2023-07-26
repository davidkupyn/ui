<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import Header from './modal-header.svelte';
	import Footer from './modal-footer.svelte';
	import { fade } from 'svelte/transition';
	import { modal, getModalContext, css } from '.';
	import { cn } from '$lib/helpers/style';
	import { X } from 'lucide-svelte';
	import Button from '../button.svelte';
	import { spring } from 'svelte/motion';

	const { portal, open, alert, overlay, content, close, crossButton, drawer, side } = getModalContext();
	let className: string | undefined | null = undefined;
	export { className as class };

	// let position = spring({ x: 0, y: 0 }, { damping: 0.6, stiffness: 0.15 });
	// let openGuard = $open;
	// open.subscribe((value) => {
	// if (!value) {
	// 	openGuard = true;
	// 	$position = { x: 0, y: 500 };
 	// 								setTimeout(() => {
	// 									openGuard = false;
 	// 									$position = { x: 0, y: 0 };
 	// 								}, 100);
	// }
	// openGuard = value;
	// });
	// let axis: 'x' |'y' | 'none' = 'none'
	// $: axis = $drawer ? ($side === 'left' || $side === 'right' ? 'x' : 'y') : 'none';
	//  use:draggable={{
 	// 					position: $position,
 	// 					bounds: {
 	// 						top: 400,
 	// 						bottom: $side === 'bottom' ? -2000 : 400,
	// 						left: $side === 'left' ? 400 : -2000,
	// 						right: $side === 'right' ? -2000 : 400,
 	// 					},
 	// 					axis: axis,
 	// 					onDrag: (data) => {
 	// 						$position = { x: data.offsetX, y: data.offsetY };
 	// 					},
 	// 					onDragEnd: () => {
	// 						let isOutOfBounds = false;
	// 						if ($side === 'bottom') {
	// 							if ($position.y > 10000) {
	// 								console.log($position.y)
	// 								isOutOfBounds = true;
	// 							}
	// 						} else if ($side === 'left') {
	// 							if ($position.x < -10000) {
	// 								isOutOfBounds = true;
	// 							}
	// 						} else if ($side === 'right') {
	// 							if ($position.x > 10000) {
	// 								isOutOfBounds = true;
	// 							}
	// 						} else {
	// 							if ($position.y < -10000) {
	// 								isOutOfBounds = true;
	// 							}
	// 						}

 	// 						if (isOutOfBounds) {
 	// 								if ($side === 'bottom') {
 	// 									$position = { x: 0, y: -800 };
 	// 								} else if ($side === 'left') {
 	// 									$position = { x: -800, y: 0 };
 	// 								} else if ($side === 'right') {
 	// 									$position = { x: 800, y: 0 };
 	// 								} else {
 	// 									$position = { x: 0, y: 800 };
 	// 								}
 	// 								setTimeout(() => {
	// 									console.log('hgrer')
 	// 									openGuard = false;
 	// 									$position = { x: 0, y: 0 };
 	// 								}, 100);
 	// 						} else {
 	// 							$position = { x: 0, y: 0 };
 	// 						}
 	// 					},
 	// 				}}
</script>
<div use:portal>
	{#if $open}
		<div class={modal({ drawer: $drawer, side: $side }).container()}>
			<div
				melt={$overlay}
				transition:fade={{ duration: 150 }}
				class="fixed z-50 inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] sm:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-600/50 to-base-600/95 dark:from-base-950/70 dark:to-base-950/95"
			/>
				<div
					transition:css={{
						duration: '--modal-duration',
						y: '--modal-y',
						x: '--modal-x',
						scale: '--modal-scale',
						opacity: '--modal-opacity',
					}}
					class={cn(modal({ drawer: $drawer, side: $side }).base(), className)}
					melt={$content}
					>
					<slot {Header} {Footer} close={$close} />
					{#if crossButton && !alert}
						<Button variant="ghost" size="icon" melt={$close} class="absolute right-3 top-3">
							<X size=16 />
						</Button>
					{/if}
				</div>

			</div>
	{/if}
</div>