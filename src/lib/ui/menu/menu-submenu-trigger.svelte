<script lang="ts">
	import { cn } from '$lib/helpers';
	import { ChevronRight } from 'lucide-svelte';
	import { ctx, menuStyles } from '.';
	const {
		elements: { subTrigger }
	} = ctx.submenu.get();
	const { item } = menuStyles();

	let className: string | undefined | null = undefined;
	export let danger = false;
	export { className as class };
</script>

<button
	class={cn(
		item(),
		'w-full focus:ring-0 ',
		danger &&
			'focus:bg-error-400/20 text-error dark:focus:text-error-200 dark:focus:bg-error-600/20 focus:text-error',
		className
	)}
	on:click|stopPropagation
	use:subTrigger
	{...$subTrigger}
>
	<slot />
	<ChevronRight class="ml-auto" size="16" />
</button>
