<script lang="ts">
	import { cn } from '$lib/helpers';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<kbd
	class={cn(
		'pointer-events-none bg-muted py-1 select-none inline-flex items-center gap-1 rounded px-1.5 font-mono text-xs font-medium opacity-100',
		className
	)}
>
	<slot />
</kbd>
