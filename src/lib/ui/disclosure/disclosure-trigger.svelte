<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers/style';
	import { ChevronRight } from 'lucide-svelte';
	import { buttonStyles } from '../button.svelte';

	export let arrow = true;
	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { trigger },
		unstyled
	} = ctx.get();
</script>

<button
	use:trigger
	{...$trigger}
	class={cn(
		!unstyled &&
			buttonStyles({
				variant: 'ghost',
				className: 'active:scale-100 w-full group data-[state=open]:text-foreground'
			}),
		className
	)}
>
	<slot />
	{#if arrow}
		<ChevronRight
			size="16"
			class="h-4 w-4 ml-auto text-accent-fo transition-[transform] group-data-[state=open]:rotate-90 group-data-[state=open]:transform"
		/>
	{/if}
</button>
