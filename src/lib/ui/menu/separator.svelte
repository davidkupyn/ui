<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getMenuContext } from '.';
	const { separator } = getMenuContext();

  let className = '';
  export { className as class };
</script>

<div {...$separator} 
  class={cn(
    '-mx-1 my-1 h-px bg-popover-border',
    className
  )}
/>
