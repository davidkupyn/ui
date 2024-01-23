<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import type { SelectOption } from '@melt-ui/svelte';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ctx } from '.';
	import { inputStyles } from '../input';
	import Suffix from '../input/input-suffix.svelte';
	import { menuStyles } from '../menu';
	import Group from './select-option-group.svelte';
	import Option from './select-option.svelte';

	export let id = '';
	export let name = '';
	export let required = false;
	export let placeholder = '';
	export let disabled = false;
	export let value: SelectOption<unknown> | undefined = undefined;
	export let loop = false;
	export let preventScroll = true;
	export let multiple = false;

	let className: string | undefined | null = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const select = ctx.set({
		onSelectedChange: ({ next }) => {
			value = next;
			dispatch('change', next);
			return next;
		},
		defaultSelected: value,
		name,
		disabled,
		required,
		loop,
		preventScroll,
		//@ts-ignore
		multiple,
		forceVisible: true
	});

	const {
		states: { open: openStore, selected: valueStore, selectedLabel: valueLabel },
		elements: { trigger, menu, hiddenInput },
		options
	} = select;

	$: valueStore.set(value);
	$: options.loop.set(loop);
	$: options.preventScroll.set(preventScroll);
	//@ts-ignore
	$: options.multiple.set(multiple);
</script>

<button
	use:trigger
	{...$trigger}
	{disabled}
	type="button"
	class={cn(
		inputStyles(),
		'w-full relative flex items-center justify-between data-[state=open]:ring-accent',
		className
	)}
	aria-label={placeholder}
>
	{#if $valueLabel}
		{$valueLabel}
	{:else}
		<span class="text-muted-foreground">{placeholder}</span>
	{/if}
	<Suffix class="aria-pressed:text-foreground" aria-pressed={$openStore}>
		<ChevronsUpDown size="16" />
	</Suffix>
</button>
<input use:hiddenInput {...$hiddenInput} {id} />
{#if $openStore}
	<ul transition:fly={{ duration: 150, y: -10 }} use:menu {...$menu} class={menuStyles().content()}>
		<slot {Option} {Group} />
	</ul>
{/if}
