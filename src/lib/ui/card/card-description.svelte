<script lang="ts">
	import { cn } from '$lib/helpers';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p class={cn('text-sm text-muted-foreground', className)} {...$$restProps}>
	<slot />
</p>
