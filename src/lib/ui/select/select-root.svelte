<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { createSelect } from '@melt-ui/svelte';
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
	export let value: unknown = undefined;
	export let loop = false;
	export let preventScroll = true;
	
	let className: string | undefined | null = undefined;
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
		group,
		groupLabel
	} = createSelect({
		value,
		name,
		disabled,
		required,
		loop,
		preventScroll,
	});

	$: valueStore.set(value);
	valueStore.subscribe((v) => {
		value = v;
		dispatch('change', v);
	});
	setContext('select', { option, isSelected, group, groupLabel });
</script>

<button
	melt={$trigger}
	{disabled}
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
		<ChevronsUpDown size=16 />
	</span>
</button>
<input melt={$input} {id} />
{#if $open}
	<ul
		transition:fly={{ duration: 150, y: -10 }}
		melt={$menu}
		class={menuStyles().content()}
	>
		<slot {Option} {Group} />
	</ul>
{/if}
