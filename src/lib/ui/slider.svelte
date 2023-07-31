<script lang="ts" context="module">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	export const badgeStyles = tv({
		slots: {
			base: 'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2',
			statusDot: 'w-1 h-1 rounded-full'
		},
		variants: {
			variant: {
				default: {
					base: 'bg-primary text-background',
					statusDot: 'bg-primary'
				},
				accent: {
					base: 'bg-accent-400/20 text-accent-600 dark:bg-accent-500/20  dark:text-accent-200 dark:bg-accent-600/20',
					statusDot: 'bg-accent'
				},
				outline: {
					base: 'ring-1 ring-base-950/10 shadow dark:border-border border border-transparent focus-visible:border-border text-foreground',
					statusDot: 'bg-transparent'
				},
				success: {
					base: 'bg-success-500/20 text-success-800 dark:text-success-200 dark:bg-success-600/20',
					statusDot: 'bg-success-500'
				},
				error: {
					base: 'bg-error-400/20 text-error dark:text-error-200 dark:bg-error-600/20',
					statusDot: 'bg-error-500'
				},
				warning: {
					base: 'bg-warning-400/20 text-warning-800 dark:text-warning-200 dark:bg-warning-600/20',
					statusDot: 'bg-warning-500'
				},
				info: {
					base: 'bg-info-400/20 text-info-600 dark:bg-info-500/20  dark:text-info-200 dark:bg-info-600/20',
					statusDot: 'bg-info-400'
				}
			}
		},
		defaultVariants: {
			variant: 'default',
			subtle: false,
			round: false
		}
	});
</script>

<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createSlider } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

	export let variant: VariantProps<typeof badgeStyles>['variant'] = 'default';
	export let value: number | number[] = 0;
	export let disabled = false;
	export let name: string | undefined = undefined;
	export let min = 0;
	export let label: string | undefined = undefined;
	export let max = 100;
	export let step = 1;
	export let className: string | undefined | null = undefined;
	export { className as class };
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	const {
		slider,
		range,
		thumb,
		value: valueStore,
		options
	} = createSlider({
		value: Array.isArray(value) ? value : [value],
		min,
		max,
		orientation,
		step,
		disabled
	});
	$: $options.orientation = orientation;

	const dispatch = createEventDispatcher();
	$: valueStore.set(Array.isArray(value) ? value : [value]);
	valueStore.subscribe((v) => {
		const newValue = Array.isArray(v) ? v : [v];
		value = newValue;
		dispatch('change', newValue);
	});
</script>

<span
	melt={$slider}
	class={cn(
		'group relative flex touch-none select-none items-center overflow-hidden data-[orientation=vertical]:flex-col',
		orientation === 'vertical' ? 'h-full min-h-[4rem] w-fit' : 'w-full',
		className
	)}
>
	<span
		class={cn(
			'relative h-8 sm:h-5 w-full shadow-inner grow overflow-hidden rounded-xl backdrop-blur-sm bg-primary/20',
			orientation === 'vertical' && 'h-full w-8'
		)}
	>
		<span
			melt={$range}
			class={cn(
				'absolute h-full bg-primary dark:shadow-[inset_0_-1px_#0000004d] shadow-[inset_0_1px_0_#ffffff4d]',
				orientation === 'vertical' ? 'w-full' : 'rounded-xl'
			)}
		/>
	</span>
	<span
		class={cn(
			'absolute mix-blend-exclusion pointer-events-none text-background dark:text-inherit',
			orientation === 'vertical' ? 'bottom-2 ' : 'left-4'
		)}><slot>{label ?? ''}</slot></span
	>
	<input type="hidden" {value} {name} {disabled} />
	{#each { length: $valueStore.length } as _, idx}
		<span
			melt={$thumb()}
			class={cn(
				'block rounded-full focus-visible:outline-none bg-primary shadow group-disabled:pointer-events-none group-disabled:opacity-50 dark:shadow-[inset_0_1px_0_#ffffff2f] transition',
				orientation === 'vertical' ? 'w-5 h-1 mb-1' : 'h-5 sm:h-3 w-1 ml-2'
			)}
		/>
	{/each}
</span>
