<script lang="ts">
	import { Check } from 'lucide-svelte';
	import type { Writable } from 'svelte/store';
	import { ctx, menuStyles } from '.';
	import { cn } from '$lib/helpers';
	import { createEventDispatcher } from 'svelte';
	import type { Action } from '@sveltejs/kit';
	import type { _CheckboxItemProps } from '@melt-ui/svelte/dist/builders/menu';
	import Wrapper from '$lib/components/wrapper.svelte';

	const dispatch = createEventDispatcher();

	export let checkbox = false;
	export let disabled = false;
	export let danger = false;
	export let description = '';
	export let checked: boolean | 'indeterminate' = false;
	const options = {
		disabled,
		defaultChecked: checked,
		onCheckedChange: ({ next }) => {
			checked = next;
			dispatch('change', next);
			return next;
		}
	} satisfies _CheckboxItemProps;
	const itemBase = ctx.getItem(
		checkbox
			? {
					type: 'checkbox',
					options
			  }
			: undefined
	);
	let item: typeof itemBase.item | typeof itemBase.checkbox.elements.checkboxItem;
	let checkedStore: Writable<boolean | 'indeterminate'>;
	let disabledStore: Writable<boolean>;
	$: disabledStore?.set(disabled);
	if (itemBase.type === 'checkbox') {
		const checkboxBuilder = itemBase.checkbox;
		const {
			elements: { checkboxItem },
			options: { disabled: disabled2 },
			states: { checked: checked2 }
		} = checkboxBuilder;
		item = checkboxItem;
		checkedStore = checked2;
		disabledStore = disabled2;
	} else {
		item = itemBase.item;
	}
	$: checkedStore?.set(checked);
	export let melt: (Record<string, any> & { action: Action<any, any> }) | undefined = undefined;

	let className: string | undefined | null = undefined;
	const { item: itemStyles } = menuStyles();
	export { className as class };
</script>

{#if melt && item}
	<div
		aria-disabled={disabled}
		class={cn(
			itemStyles(),
			checkbox && 'relative pl-8',
			danger &&
				'focus:bg-error-400/20 text-error dark:focus:text-error-200 dark:focus:bg-error-600/20 focus:text-error',
			description && 'h-fit',
			className
		)}
		{...$item}
		use:item
		on:m-click={(e) => dispatch('select', e.detail)}
		{...melt}
		use:melt.action
		{...$$restProps}
	>
		<slot />
		{#if checked && checkbox}
			<Check size="16" class="absolute left-2 top-1/2 -translate-y-1/2" />
		{/if}
		{#if $$slots.after}
			<span class="ml-auto">
				<slot name="after" />
			</span>
		{/if}
	</div>
{:else}
	<div
		aria-disabled={disabled}
		class={cn(
			itemStyles(),
			checkbox && 'relative pl-8',
			danger &&
				'focus:bg-error-400/20 text-error dark:focus:text-error-200 dark:focus:bg-error-600/20 focus:text-error',
			($$slots.description || description) && 'h-fit',

			className
		)}
		{...$item}
		use:item
		on:m-click={(e) => dispatch('select', e.detail)}
		{...$$restProps}
	>
		<Wrapper class="flex flex-col gap-1 mr-2" show={!!description || $$slots.description}>
			<slot />
			<slot name="description">
				<p>
					{description}
				</p>
			</slot>
		</Wrapper>
		{#if checked && checkbox}
			<Check size="16" class="absolute left-2 top-1/2 -translate-y-1/2" />
		{/if}
		{#if $$slots.after}
			<span class="ml-auto">
				<slot name="after" />
			</span>
		{/if}
	</div>
{/if}
