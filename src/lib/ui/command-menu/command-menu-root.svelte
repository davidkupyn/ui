<script lang="ts">
	import type { ComboboxOption } from '@melt-ui/svelte';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ctx } from '.';
	import { Input } from '../input';
	import { menuStyles } from '../menu';
	import Empty from './command-menu-empty.svelte';
	import Item from './command-menu-item.svelte';

	export let required = false;
	export let placeholder = '';
	export let disabled = false;
	export let value: ComboboxOption<unknown> | undefined = undefined;
	export let loop = false;
	export let preventScroll = true;
	export let multiple = false;
	export let debounce = 0;
	export let label = '';
	export let description = '';
	export let error = '';
	export let emptyText = 'No results found';
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
		loop,
		preventScroll,
		//@ts-ignore
		multiple,
		debounce,
		forceVisible: true
	});

	const {
		states: { open: openStore, selected: valueStore },
		elements: { input, menu },
		options
	} = select;

	$: valueStore.set(value);
	$: options.loop.set(loop);
	$: options.preventScroll.set(preventScroll);
	//@ts-ignore
	$: options.multiple.set(multiple);
</script>

<div>
	<Input
		use={input}
		{...$input}
		{disabled}
		{required}
		class={className}
		{placeholder}
		{label}
		{description}
		{error}
	>
		<ChevronsUpDown
			slot="suffix"
			size="16"
			class="aria-pressed:text-foreground"
			aria-pressed={$openStore}
		/>
	</Input>

	<ul use:menu {...$menu} class={menuStyles().content()}>
		<slot {Item} {Empty} />
		<slot name="empty">
			<Empty>{emptyText}</Empty>
		</slot>
	</ul>
</div>
