<script lang="ts">
	import { cn } from "$lib/helpers/style";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>
<div class={cn("flex gap-4 w-full flex-col-reverse sm:flex-row sm:justify-end", className)}>
  <slot />
</div>