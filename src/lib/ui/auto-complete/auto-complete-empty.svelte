<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		states: { inputValue, touchedInput },
		options: { items }
	} = ctx.get();

	$: isEmpty =
		$touchedInput && !$items.some((item) => item.toLowerCase().includes($inputValue.toLowerCase()));
</script>

{#if isEmpty}
	<li
		class={cn(
			'flex cursor-default gap-2 select-none text-foreground items-center rounded-xl px-4 py-1.5 h-9 sm:text-sm',
			className
		)}
	>
		<slot />
	</li>
{/if}
