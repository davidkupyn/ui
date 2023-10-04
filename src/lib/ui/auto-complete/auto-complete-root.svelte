<script lang="ts">
	import type { ComboboxOption } from '@melt-ui/svelte';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ctx } from '.';
	import { Input } from '../input';
	import { menuStyles } from '../menu';
	import Empty from './auto-complete-empty.svelte';
	import Option from './auto-complete-option.svelte';
	export let id = '';
	export let name = '';
	export let required = false;
	export let placeholder = '';
	export let disabled = false;
	export let value: ComboboxOption<string> | ComboboxOption<string>[] | undefined = undefined;
	export let loop = false;
	export let preventScroll = true;
	export let multiple = false;
	export let debounce = 0;
	export let label = '';
	export let description = '';
	export let error = '';
	export let emptyText = 'No results found';
	export let items: {
		label: string;
		value: string;
	}[] = [];

	let className: string | undefined | null = undefined;
	export { className as class };
	const dispatch = createEventDispatcher();

	const autoComplete = ctx.set<string>({
		onSelectedChange: ({ next }) => {
			value = next;
			dispatch('change', next);
			return next;
		},
		defaultSelected: value,
		loop,
		preventScroll,
		debounce,
		forceVisible: true,
		//@ts-ignore
		multiple
	});

	const {
		states: { open: openStore, selected: valueStore },
		elements: { input, menu },
		options
	} = autoComplete;

	$: valueStore.set(value);
	$: options.loop.set(loop);
	$: options.preventScroll.set(preventScroll);
	//@ts-ignore
	$: options.multiple.set(multiple);
</script>

<Input
	use={input}
	{...$input}
	{id}
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
<input {name} type="hidden" value={JSON.stringify($valueStore.map((value) => value.value))} />
{#if $openStore}
	<ul transition:fly={{ duration: 150, y: -10 }} use:menu {...$menu} class={menuStyles().content()}>
		<slot {Option} {Empty} />

		<slot name="empty">
			<Empty>{emptyText}</Empty>
		</slot>
	</ul>
{/if}
