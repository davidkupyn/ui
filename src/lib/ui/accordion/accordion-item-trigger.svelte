<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers';
	import { ChevronRight } from 'lucide-svelte';
	import Button from '../button.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { trigger }
	} = ctx.get();
	const item = ctx.item.get();
</script>

<Button
	melt={$trigger($item)}
	variant="ghost"
	class={cn('active:scale-100 w-full group aria-expanded:text-foreground', className)}
>
	<slot />
	<ChevronRight
		size="16"
		class="h-4 w-4 ml-auto text-primary transition group-aria-expanded:rotate-90 group-aria-expanded:transform"
	/>
</Button>
