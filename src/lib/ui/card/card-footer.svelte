<script lang="ts">
	import { cn } from "$lib/helpers/style";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>
<div class={cn("flex items-center", className)}>
  <slot/>
</div>