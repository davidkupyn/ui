<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { createSelect } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { cn } from '$lib/helpers/style';
	import Option from './option.svelte';
	import Group from './option-group.svelte';

	const dispatch = createEventDispatcher();
	export let id = '';
	export let name = '';
	export let required = false;
	export let placeholder = '';
	export let disabled = false;
	export let value: unknown = undefined;

	let className = '';
	export { className as class };

	const {
		value: valueStore,
		label,
		trigger,
		menu,
		option,
		isSelected,
		open,
		input,
		createGroup
	} = createSelect({
		value,
		name,
		disabled,
		required
	});

	$: valueStore.set(value);
	valueStore.subscribe((v) => {
		value = v;
		dispatch('change', v);
	});
	setContext('select', { option, isSelected, createGroup });
</script>

<button
	{...$trigger}
	{disabled}
	use:trigger
	type="button"
	class={cn('input-group w-full justify-between data-[state=open]:ring-accent', className)}
	aria-label={placeholder}
>
	{#if $label}
		{$label}
	{:else}
		<span class="text-muted-foreground">{placeholder}</span>
	{/if}
	<span class="icon-right" aria-pressed={$open}>
		<ChevronsUpDown size={16} />
	</span>
</button>
<input {...$input} {id} />
{#if $open}
	<ul
		transition:fly={{ duration: 150, y: -10 }}
		{...$menu}
		use:menu
		class=" z-10 mt-1.5 p-1 flex flex-col gap-1 origin-top rounded-2xl border border-popover-border bg-popover drop-shadow-lg focus:outline-none overflow-y-auto"
	>
		<slot {Option} {Group} />
	</ul>
{/if}
