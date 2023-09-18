<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLParagraphElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<p class={cn('text-sm [&_p]:leading-relaxed', className)} {...$$restProps}>
	<slot />
</p>
