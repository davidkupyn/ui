<script lang="ts">
	import { scale } from 'svelte/transition';
	import { getRadioGroupContext } from ".";
	import { cn } from '$lib/helpers/style';
  export let value: string;
  export let disabled = false;
  export let id = crypto.randomUUID();
  let className: string | undefined | null = undefined;
  export { className as class };
  const { item, isChecked} = getRadioGroupContext();
</script>

<svelte:element this={$$slots.default ? 'label' : 'div'} class={cn("flex items-center gap-3", className)} data-state={$isChecked(value) ? 'checked' : 'unchecked'} aria-checked={$isChecked(value)}>
  <button
    melt={$item({value, disabled})}
    class="h-5 w-5 sm:h-4 sm:w-4 my-1 focus:outline-none shrink-0 cursor-pointer data-[state=checked]:bg-accent ring-1 ring-foreground/20 data-[state=checked]:ring-accent shadow rounded-full grid place-content-center focus-visible:ring-2 bg-transparent text-accent outline-0 focus-visible:ring-offset-background focus-visible:ring-offset-2"
    aria-labelledby="{id}-label"
    {id}
  >
    {#if $isChecked(value)}
      <div transition:scale={{start: 0.5}} class="h-1.5 w-1.5 rounded-full bg-background" />
    {/if}
  </button>
  <slot>
      <label
        class="capitalize leading-none w-full"
        id="{id}-label"
        for={id}
      >
      {value}
    </label>
  </slot>
</svelte:element>