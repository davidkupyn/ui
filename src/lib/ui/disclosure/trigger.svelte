<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ChevronRight } from 'lucide-svelte';
	import { getDisclosureContext } from '.';

	const { trigger } = getDisclosureContext();
	export let arrow = true;
	export let styled = true;
	let className = '';
	export { className as class };
</script>

<button
	{...$trigger}
	use:trigger
	class={cn(
		styled && 'btn btn-ghost active:scale-100 w-full group data-[state=open]:text-foreground',
		className
	)}
>
	<slot />
	{#if arrow}
		<ChevronRight
			size={16}
			class="h-4 w-4 ml-auto text-accent-fo transition group-data-[state=open]:rotate-90 group-data-[state=open]:transform"
		/>
	{/if}
</button>
