<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('mt-1 space-y-4 text-sm/6 text-error', className)} {...$$restProps}>
	<slot />
</div>
