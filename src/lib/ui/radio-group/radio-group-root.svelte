<script lang="ts">
	import Radio from './radio-item.svelte';
	import { cn } from '$lib/helpers/style';
  import { createRadioGroup } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
  
  export let value: string | undefined = undefined; 
  export let disabled = false;
  export let loop = false;
  export let orientation: 'horizontal' | 'vertical' = 'vertical';
  export let required = false;
  let className: string | undefined | null = undefined;
  export { className as class };

  const radioGroup = createRadioGroup({
    value,
    disabled,
    loop,
    orientation,
    required  
  });

  const {root, value: valueStore} = radioGroup;
  setContext('radio-group', radioGroup);
 $: valueStore.set(value || null);
  valueStore.subscribe((v) => {
    value = v || undefined;
  });
</script>
 
<div
  melt={$root}
  class={cn("flex flex-col gap-3 data-[orientation=horizontal]:flex-row", className)}
  aria-label="View density"
>
  <slot {Radio} />
</div>

