<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getMenuContext, menuStyles } from '.';
	const { separator } = getMenuContext();

  let className = '';
  const {separator: seperatorStyles} = menuStyles()
  export { className as class };
</script>

<div {...$separator}
  data-orientation='horizontal'
  class={cn(
    seperatorStyles(),
    className
  )}
/>
