<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ChevronRight } from 'lucide-svelte';
	import { getSubMenuContext, menuStyles } from '.';
	const { subTrigger } = getSubMenuContext();
  const { item } = menuStyles()

	let className = '';
	export { className as class };
</script>

	<button
		class={cn(
      item(),
      'w-full focus:ring-0 data-[state=open]:bg-muted data-[state=open]:text-foreground',
			className
		)}
		use:subTrigger
		on:click|stopPropagation
		{...$subTrigger}
	>
		<slot />
		<ChevronRight class="ml-auto" size={16} />
	</button>
