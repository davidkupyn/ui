<script lang="ts">
	import { cn } from '$lib/helpers/style';
  import { createSlider } from '@melt-ui/svelte';

  export let value: number | number[] = 0;
  export let disabled = false;
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
</script>
 
<span {...$slider} class={cn("group relative flex w-full touch-none select-none items-center", className)}>
  <span class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
    <span {...$range} class="absolute h-full bg-primary" />
  </span>
 
  {#each { length: $valueStore.length } as _}
    <span
      {...$thumb()}
      use:thumb
      class="block h-4 w-4 rounded-full focus:outline-0 border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring group-disabled:pointer-events-none group-disabled:opacity-50"
    />
  {/each}
</span>