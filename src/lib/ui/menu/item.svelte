<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { writable, type Writable } from 'svelte/store';
	import { getMenuContext } from '.';
	import type { CheckboxItemArgs, ItemArgs } from '@melt-ui/svelte/dist/builders/menu';
	import { cn } from '$lib/helpers/style';
	import { createEventDispatcher } from 'svelte';

	export let checkbox = false;
	const { item: regularItem, checkboxItem } = getMenuContext();

	const baseItem = checkbox ? checkboxItem : regularItem;
	const item = {
		...baseItem,
		action(node: HTMLElement, options: CheckboxItemArgs | ItemArgs) {
			if (checkbox) {
				const checkboxOptions = options as CheckboxItemArgs;
				checkboxItem(node, checkboxOptions);
			} else {
				regularItem(node, options);
			}
		}
	};

	let checkboxStore: Writable<boolean | 'indeterminate'>;
	if (checkbox) {
		checkboxStore = writable(false);
	}

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher();
</script>

<div class="px-1 py-1">
	<div
		class={cn(
			'gap-2 items-center rounded-xl text-sm transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none h-9 py-2 px-4 text-muted-foreground flex w-full justify-start hover:bg-transparent focus:bg-muted focus:text-foreground active:scale-100 focus:ring-transparent',
			className
		)}
		{...$item}
		use:item.action={{
			checked: checkboxStore,
			onSelect: (e) => {
				dispatch('select', e);
			}
		}}
    {...$$restProps}
	>
		<slot />
		{#if checkbox && $checkboxStore}
			<Check class="icon" />
		{/if}
	</div>
</div>
