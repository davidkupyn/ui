<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createLabel } from '@melt-ui/svelte';
  export let required = false;
	const label = createLabel();
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<label {...$$restProps} use:label class={cn("text-muted-foreground flex items-center w-fit mb-1.5 text-sm", className)} data-melt-part="root">
  <slot />
  {#if required}
    <span class="text-error ml-1">*</span>
  {/if}
</label>
