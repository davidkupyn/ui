<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ChevronRight } from 'lucide-svelte';
	import { getDisclosureContext } from '.';
	import { buttonStyles } from '../button.svelte';

	const { trigger, unstyled } = getDisclosureContext();
	export let arrow = true;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<button
	melt={$trigger}
	class={cn(
		!unstyled && buttonStyles({ variant: 'ghost', className: 'active:scale-100 w-full group data-[state=open]:text-foreground' }),
		className
	)}
>
	<slot />
	{#if arrow}
		<ChevronRight
			size=16
			class="h-4 w-4 ml-auto text-accent-fo transition-[transform] group-data-[state=open]:rotate-90 group-data-[state=open]:transform"
		/>
	{/if}
</button>
