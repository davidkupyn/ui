<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ChevronRight } from 'lucide-svelte';
	import { getSubMenuContext } from '.';
	const { subTrigger } = getSubMenuContext();

	let className = '';
	export { className as class };
</script>

	<button
		class={cn(
      'flex cursor-default select-none text-muted-foreground items-center rounded-xl disabled:opacity-50 disabled:pointer-events-none px-4 w-full h-9 outline-none focus:bg-muted focus:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground sm:text-sm',
			className
		)}
		use:subTrigger
		on:click|stopPropagation
		{...$subTrigger}
	>
		<slot />
		<ChevronRight class="ml-auto" size={16} />
	</button>
