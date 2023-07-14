<script lang="ts">
	import Header from './card-header.svelte';
	import Footer from './card-footer.svelte';
	import { cn } from "$lib/helpers/style";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<div class={cn("rounded-3xl bg-background border border-transparent ring-1 ring-base-950/10 shadow dark:border-border p-6 grid gap-6", className)} {...$$restProps}>
  <slot {Header} {Footer} />
</div>
