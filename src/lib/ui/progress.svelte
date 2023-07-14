<script lang='ts' context="module">
 const progressStyles = tv({
  slots: {
    base: 'relative h-2 w-full overflow-hidden rounded-full',
    indicator: 'h-full w-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] [box-shadow:_inset_0_1px_0px_0px_hsl(0_0%_100%/0.3)] dark:[box-shadow:_inset_0_-1px_1px_0px_hsl(240_6%_10%/0.3)]'
  },
  variants: {
    variant: {
      primary: {
        base: 'bg-primary-500/20',
        indicator: 'bg-primary'
      },
      accent: {
        base: 'bg-accent-500/20',
        indicator: 'bg-accent'
      },
      success: {
        base: 'bg-success-500/20',
        indicator: 'bg-success'
      },
      error: {
        base: 'bg-error-500/20',
        indicator: 'bg-error'
      },
      warning: {
        base: 'bg-warning-500/20',
        indicator: 'bg-warning'
      },
      info: {
        base: 'bg-info-500/20',
        indicator: 'bg-info'
      },
    }
  }
 })
</script>
<script lang="ts">
	import { cn } from '$lib/helpers/style';
  import { createProgress } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';
  export let value: number;
  export let variant: VariantProps<typeof progressStyles>["variant"] = 'primary'
  export let max = 100
  let className: string | undefined | null = undefined;
  export { className as class };
  const { progress, value: valueStore, max: maxStore } = createProgress({
    value,
    max,
  });
  const dispatch = createEventDispatcher();
  $: valueStore.set(value);
  valueStore.subscribe((value) => {
    value = value;
    dispatch('change', value);
  });
  const {base, indicator} = progressStyles({variant})
</script>
 
<div
  {...$progress}
  class={cn(base(), className)}
>
  <div
    class={indicator()}
    style={`transform: translateX(-${
      100 - (100 * ($valueStore ?? 0)) / ($maxStore ?? 1)
    }%)`}
  />
</div>