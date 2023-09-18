<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLHeadingElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<h5 class={cn('mb-1 font-medium leading-none tracking-tight', className)} {...$$restProps}>
	<slot />
</h5>
