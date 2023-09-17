<script lang="ts">
	import { ctx } from '.';
	import { fly } from 'svelte/transition';
	import { ChevronsUpDown } from 'lucide-svelte';
	import type { SelectOption } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { cn } from '$lib/helpers/style';
	import Option from './select-option.svelte';
	import Group from './select-option-group.svelte';
	import { menuStyles } from '../menu';

	const dispatch = createEventDispatcher();
	export let id = '';
	export let name = '';
	export let required = false;
	export let placeholder = '';
	export let disabled = false;
	export let value: SelectOption<unknown> | undefined = undefined;
	export let loop = false;
	export let preventScroll = true;

	let className: string | undefined | null = undefined;
	export { className as class };

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
		preventScroll
	});

	const {
		states: { open: openStore, selected: valueStore, selectedLabel: valueLabel },
		elements: { trigger, input, menu },
		options
	} = select;

	$: valueStore.set(value);
	valueStore.subscribe((v) => {
		value = v;
		dispatch('change', v);
	});
</script>

<button
	use:trigger
	{...$trigger}
	{disabled}
	type="button"
	class={cn('input-group w-full justify-between data-[state=open]:ring-accent', className)}
	aria-label={placeholder}
>
	{#if $valueLabel}
		{$valueLabel}
	{:else}
		<span class="text-muted-foreground">{placeholder}</span>
	{/if}
	<span class="icon-right" aria-pressed={$openStore}>
		<ChevronsUpDown size="16" />
	</span>
</button>
<input use:input {...$input} {id} />
{#if $openStore}
	<ul transition:fly={{ duration: 150, y: -10 }} use:menu {...$menu} class={menuStyles().content()}>
		<slot {Option} {Group} />
	</ul>
{/if}
