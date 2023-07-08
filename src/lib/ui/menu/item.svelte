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


	let className = '';
  export let checked = false;
	export { className as class };

	const dispatch = createEventDispatcher();

  let checkboxStore: Writable<boolean | 'indeterminate'>;
    if (checkbox) {
      checkboxStore = writable(false);
      checkboxStore.subscribe((v) => {
        checked = !!v;
        dispatch('change', v);
      });
    }
    $: checkbox && checkboxStore.set(checked);
</script>

<div
  class={cn(
      'flex cursor-default gap-2 select-none text-muted-foreground items-center rounded-xl disabled:opacity-50 disabled:pointer-events-none px-4 py-1.5 h-9 outline-none focus:bg-muted focus:text-foreground sm:text-sm',
    className,
    checked && checkbox && 'rounded-full bg-muted'
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
  {#if checked && checkbox}
    <Check size={16} class="absolute left-0"/>
  {/if}
</div>

