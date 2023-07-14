<script lang="ts">
	import { cn } from "$lib/helpers/style";
	import { createEventDispatcher } from "svelte";
	import { getRadioGroupContext, menuStyles } from ".";

  const {radioItem, isChecked} = getRadioGroupContext();

  export let value: string;
  export let disabled = false;
  let className = "";
  const {item} = menuStyles()
  export { className as class };

	const dispatch = createEventDispatcher();
</script>
	<div 
    class={cn(
      item(), 
      'relative pl-8 aria-checked:font-medium aria-checked:bg-accent-500/20 aria-checked:text-foreground aria-checked:focus:bg-accent-500/30',
      className
    )}
    melt={$radioItem({ value, disabled })}
    use:radioItem={{onSelect: (e) => {
      dispatch('select', e);
    }}}
    >
    {#if $isChecked(value)}
      <span class="absolute left-3 rounded-full w-1.5 h-1.5 bg-accent-foreground top-1/2 -translate-y-1/2"/>
    {/if}
	<slot/>
  {#if $$slots.after}
    <span class="ml-auto">
      <slot name="after" />
    </span>
  {/if}
</div>