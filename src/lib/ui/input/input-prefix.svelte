<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<span
	class={cn(
		'absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground',
		className
	)}
	{...$$restProps}
>
	<slot />
</span>
