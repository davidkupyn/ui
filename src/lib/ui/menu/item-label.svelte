<script lang="ts">
	import { cn } from '$lib/helpers/style';

	let className = '';
	export { className as class };
</script>

<span class={cn('input-label py-2 pl-5 pr-5 font-semibold text-foreground', className)}>
	<slot />
</span>
