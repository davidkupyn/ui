<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<span
	class={cn('absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground', className)}
	{...$$restProps}
>
	<slot />
</span>
