<script lang="ts">
	import Header from './modal-header.svelte';
	import Footer from './modal-footer.svelte';
	import { fade, type TransitionConfig } from 'svelte/transition';
	import { modal, getModalContext } from '.';
	import { cn } from '$lib/helpers/style';
	import { X } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import Button from '../button.svelte';

	const { portal, open, alert, overlay, content, close, crossButton } = getModalContext();
	let className: string | undefined | null = undefined;
	export { className as class };

function split_css_unit(value: number | string): [number, string] {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [(value as number), 'px'];
}
function css(
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0, scale = 0.95 }: {
		delay?: number;
		duration?: number | string;
		easing?: (t: number) => number;
		x?: number | string;
		y?: number | string;
		opacity?: number;
		scale?: number | string;
	} = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const sd = typeof scale === 'string' ? 1 - Number(style.getPropertyValue(scale)) : 1 - scale;
	const isXVar = typeof x === 'string' && x.startsWith('--');
	const isYVar = typeof y === 'string' && y.startsWith('--');
	const [xValue, xUnit] = split_css_unit(isXVar ? style.getPropertyValue(x) : x);
	const [yValue, yUnit] = split_css_unit(isYVar ? style.getPropertyValue(y) : y);
	duration = typeof duration === 'string' ? parseFloat(style.getPropertyValue(duration)) : duration; 
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit}) scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}`
	};
}
</script>
<div use:portal>
	{#if $open}
		<div class='z-50 flex justify-center sm:items-center items-end fixed inset-0'>
			<div
				melt={$overlay}
				transition:fade={{ duration: 150 }}
				class="fixed z-50 inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] sm:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-600/50 to-base-600/95 dark:from-base-950/70 dark:to-base-950/95"
			/>
			<div
				transition:css={{
					duration: '--modal-duration',
					y: '--modal-y',
					scale: '--modal-scale'
				}}
				class={cn(modal().base(), className)}
				melt={$content}
				>
				<slot {Header} {Footer} close={$close} />
				{#if crossButton && !alert}
					<Button variant="ghost" size="icon" _melt={$close} class="absolute right-3.5 top-3.5">
						<X size=16 />
					</Button>
				{/if}
			</div>
		</div>
	{/if}
</div>