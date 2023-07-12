<script lang="ts">
	import { cn } from "$lib/helpers/style";
  let className: string | undefined | null = undefined;
  export { className as class };
  
</script>

<div class={cn('bg-base-200/50 dark:bg-base-800 rounded-xl animate-pulse', className)} {...$$restProps}/>