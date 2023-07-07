<script lang="ts">
	import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-svelte';
	import { createCombobox, createSelect } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { cn } from '$lib/helpers/style';
	import Option from './item.svelte';
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

	const { open, input, menu, item, inputValue, isSelected, filteredItems, selectedItem } =
		createCombobox({
			value,
			name,
			disabled,

			required
		});

	$: selectedItem.set(value);
	selectedItem.subscribe((v) => {
		value = v;
		dispatch('change', v);
	});
	setContext('auto-complete', { open, input, menu, item, inputValue, isSelected, filteredItems });
</script>

<div class="relative">
	<label class="input-group">
		<input {...$input} placeholder="Best book ever" use:input value={$inputValue} />
		<span class="icon-right">
			{#if $open}
				<ChevronUp />
			{:else}
				<ChevronDown />
			{/if}
		</span>
	</label>
</div>

<ul
	{...$menu}
	use:menu
	class=" z-10 mt-1.5 p-1 flex flex-col gap-1 origin-top rounded-2xl border border-popover-border bg-popover drop-shadow-lg focus:outline-none overflow-y-auto"
>
	<slot {Option} {Group} />
</ul>
