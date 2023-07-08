<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getMenuContext } from '.';
	const { separator } = getMenuContext();

  let className = '';
  export { className as class };
</script>

<hr {...$separator} 
  class={cn(
    'border-t border-popover-border',
    className
  )}
/>
