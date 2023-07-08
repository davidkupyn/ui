<script lang="ts">
	import { cn } from "$lib/helpers/style";

 let className = '';
  export { className as class };
</script>

<kbd class={cn('', className)}>
  <slot />
</kbd>