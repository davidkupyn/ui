<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ChevronRight } from 'lucide-svelte';
	import { getSubMenuContext } from '.';
	const { subTrigger } = getSubMenuContext();

	let className = '';
	export { className as class };
</script>

<div class="px-1 py-1">
	<button
		class={cn(
			'gap-2 items-center rounded-xl text-sm font-medium transition focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none h-9 py-2 px-4 text-muted-foreground flex w-full justify-start hover:bg-transparent focus-visible:bg-muted focus-visible:text-foreground active:scale-100 focus-visible:ring-transparent',
			className
		)}
		use:subTrigger
		on:click|stopPropagation
		{...$subTrigger}
	>
		<slot />
		<ChevronRight class="ml-auto" size={16} />
	</button>
</div>
