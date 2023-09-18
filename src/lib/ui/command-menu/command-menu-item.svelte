<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { Check } from 'lucide-svelte';
	import { ctx } from '.';
	import { menuStyles } from '../menu';

	export let value = '';
	export let disabled = false;

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { option },
		states: { inputValue, touchedInput },
		helpers: { isSelected }
	} = ctx.get();
	const { item } = menuStyles();

	$: show = $touchedInput ? value.includes($inputValue) : true;
</script>

{#if show}
	<li
		{...$option({ value, disabled })}
		use:option
		class={cn(
			item(),
			'relative data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[selected]:font-medium pl-8 data-[selected]:text-foreground',
			$isSelected(value) && 'text-foreground',
			className
		)}
	>
		<slot />
		{#if $isSelected(value)}
			<Check size="16" class="absolute left-2 top-1/2 -translate-y-1/2 text-accent" />
		{/if}
	</li>
{/if}
