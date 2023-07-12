<script lang="ts">
	import { fade, scale, fly } from 'svelte/transition';
	import Title from './modal-title.svelte';
	import Description from './modal-description.svelte';
	import { modal, getModalContext } from '.';
	import { cn } from '$lib/helpers/style';
	import { X } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';

	const { portal, open, alert, overlay, content, close, crossButton } = getModalContext();
	let className: string | undefined | null = undefined;
	export { className as class };

	function modalAnimation(element: HTMLElement, {
		duration = 200,
		easing = 'ease-out'
	} ) {
		const keyframes = [
			{ transform: 'translateY(var(--modal-y-from))', scale: 'var(--modal-scale-from)' },
			{ transform: 'translateY(var(--modal-y-to))', scale: 'var(--modal-scale-to)' },
		];
		const animation = element.animate(keyframes, {
			duration,
			easing,
			fill: 'forwards'
		});
		animation.onfinish = () => {
			console.log('finished');
		};	
	}

// 	function modalTransition(element: Element, { delay = 0, duration = 400, easing = cubicOut } = {}): TransitionConfig {
// 	const s = +getComputedStyle(element).scale;
// 	return {
// 		delay,
// 		duration,
// 		easing,
// 		css: (t) => `scale: ${t * s}`
// 	};
// }
// function modalTransition(
// 	node: Element,
// 	{ delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}
// ): TransitionConfig {
// 	const style = getComputedStyle(node);
// 	const target_opacity = +style.opacity;
// 	const transform = style.transform === 'none' ? '' : style.transform;
// 	const sd = 1 - start;
// 	const od = target_opacity * (1 - opacity);
// 	return {
// 		delay,
// 		duration,
// 		easing,
// 		css: (_t, u) => `
// 			transform: ${transform} scale(${1 - sd * u});
// 			opacity: ${target_opacity - od * u}
// 		`
// 	};
// }
let innerWidth = 0;
$: isMobile = innerWidth < 640;
function modalTransition(element: HTMLElement, isMobile: boolean) {
	return isMobile
		? fly(element, { y: 80, duration: 200 })
		: scale(element, { duration: 150, start: 0.95 });
}
</script>
<svelte:window bind:innerWidth />
<div use:portal>
	{#if $open}
		<div class='z-50 flex justify-center sm:items-center items-end fixed inset-0'>
			<div
				{...$overlay}
				transition:fade={{ duration: 150 }}
				class="fixed z-50 inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] sm:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-600/50 to-base-600/95 dark:from-base-950/70 dark:to-base-950/95"
			/>
			<div
				transition:modalTransition={isMobile}
				class={cn(modal({ alert }).base(), className)}
				{...$content}
				use:content
			>
				<slot {Title} {Description} close={$close} />
	
				{#if crossButton && !alert}
					<button {...$close} use:close class="absolute right-4 top-4 btn btn-sm btn-ghost btn-icon">
						<X size=16 />
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>