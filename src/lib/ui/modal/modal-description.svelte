<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { modal, ctx } from '.';
	import { cn } from '$lib/helpers';

	const {
		elements: { description }
	} = ctx.get();

	type $$Props = HTMLAttributes<HTMLParagraphElement>;

	let className: $$Props['class'] = undefined;

	export { className as class };
</script>

<p class={cn(modal().description(), className)} use:description {...$description} {...$$restProps}>
	<slot />
</p>
