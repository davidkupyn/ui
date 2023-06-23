<script lang="ts">
	import { ChevronsUpDown } from 'lucide-svelte';
	import { createSelect } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { cn } from '$lib/helpers/style';

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
		input
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
	setContext('select', { option, isSelected });
</script>

<button
	{...$trigger}
	{disabled}
	type="button"
	class={cn('input-group w-full justify-between', className)}
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
<ul
	{...$menu}
	class=" z-10 mt-1.5 p-1 flex flex-col space-y-1 origin-top rounded-2xl border border-muted bg-background drop-shadow-lg focus:outline-none overflow-y-auto"
>
	<slot />
</ul>
