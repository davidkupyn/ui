<script lang="ts">
	import { cn } from '$lib/helpers/style';
  import { createSlider } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';

  export let value: number | number[] = 0;
  export let disabled = false;
  export let name: string | undefined = undefined;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let className: string | undefined | null = undefined;
  export { className as class };
  const { slider, range, thumb, value: valueStore } = createSlider({
    value: Array.isArray(value) ? value : [value],
    min,
    max,
    orientation,
    step,
    disabled
  });
  const dispatch = createEventDispatcher();
  $: valueStore.set(Array.isArray(value) ? value : [value]);
  valueStore.subscribe((v) => {
    const newValue = Array.isArray(v) ? v : [v];
    value = newValue;
    dispatch('change', newValue);
  });
</script>
 
<span melt={$slider} class={cn("group relative flex w-full touch-none select-none items-center", className)}>
  <span class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-accent-500/20">
    <span melt={$range} class="absolute h-full bg-accent shadow-[inset_0_1px_#ffffff4d] rounded-full" />
  </span>
  <input type='hidden' {value} {name} {disabled} />
  {#each { length: $valueStore.length } as _}
    <span
      melt={$thumb()}
      class="block h-5 w-5 sm:h-4 sm:w-4 rounded-full focus-visible:outline-none border border-accent-500/50 bg-background shadow transition-colors focus-visible:ring-1 focus-visible:ring-accent group-disabled:pointer-events-none group-disabled:opacity-50 dark:shadow-[inset_0_1px_0_#ffffff2f]"
    />
  {/each}
</span>