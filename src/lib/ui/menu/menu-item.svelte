<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { writable, type Writable } from 'svelte/store';
	import { getMenuContext, menuStyles } from '.';
	import type { CheckboxItemArgs, ItemArgs } from '@melt-ui/svelte/dist/builders/menu';
	import { cn } from '$lib/helpers/style';
	import { createEventDispatcher } from 'svelte';

	export let checkbox = false;
  export let disabled = false;
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
  const { item: itemStyles } = menuStyles()
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
  aria-disabled={disabled}
  class={cn(
    itemStyles(),
    checkbox && 'relative pl-8',
    className,
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
    <Check size={16} class="absolute left-2 top-1/2 -translate-y-1/2"/>
  {/if}
  {#if $$slots.after}
    <span class="ml-auto">
      <slot name="after" />
    </span>
  {/if}
</div>

