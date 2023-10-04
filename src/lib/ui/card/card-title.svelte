<script lang="ts">
	import { cn } from '$lib/helpers';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h3 class={cn('font-semibold leading-none tracking-tight', className)} {...$$restProps}>
	<slot />
</h3>
