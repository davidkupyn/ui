<script lang="ts">
	import Item from './item.svelte';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { createCombobox } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();
	// export let id = '';
	// export let name = '';
	// export let required = false;
	// export let placeholder = '';
	// export let disabled = false;
	export let value: {
		label: string;
		value: string;
	} | undefined = undefined;
	const items = writable([])
	let className: string | undefined | null = undefined;
	export { className as class };

	const { open, input, menu, item, inputValue, isSelected, filteredItems, selectedItem } =
		createCombobox<{
			label: string;
			value: string;
		}>({
			items: $items,
			itemToString(item) {
				return item.value as string;
			},
			filterFunction(item, input) {
				return item.value.toLowerCase().includes(input.toLowerCase());
			},
		});

	$: selectedItem.set(value);
	selectedItem.subscribe((v) => {
		value = v;
		dispatch('change', v);
	});
	setContext('auto-complete', { open, input, menu, item, inputValue, isSelected, filteredItems,  });
</script>

<div class="relative">
	<label class="input-group">
		<input melt={$input} placeholder="Best book ever" use:input value={$inputValue} />
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
	melt={$menu}
	class="z-10 mt-1.5 p-1 flex flex-col gap-1 origin-top rounded-2xl border border-popover-border bg-popover drop-shadow-lg focus:outline-none overflow-y-auto"
>
	<slot {Item}>
		{#each $filteredItems as itemObj, idx (itemObj.value)}
			<Item
				index={idx}
				value={itemObj.value}
			>
				{itemObj.label}
			</Item>
		{/each}
	</slot>
</ul>
