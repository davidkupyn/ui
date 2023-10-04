<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;
	let className: $$Props['class'] = undefined;

	export { className as class };
</script>

<div
	class={cn('bg-base-200/50 dark:bg-base-800 rounded-lg animate-pulse', className)}
	{...$$restProps}
/>
