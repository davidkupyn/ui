<script lang="ts">
	import { cn } from "$lib/helpers/style";

 let className: string | undefined | null = undefined;
  export { className as class };
</script>

<kbd class={cn('bg-muted dark:bg-background pointer-events-none text-foreground py-1 select-none flex items-center gap-1 rounded-md px-1.5 font-mono text-xs font-medium opacity-100', className)}>
  <slot />
</kbd>