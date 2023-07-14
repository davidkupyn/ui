<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { Check } from 'lucide-svelte';
	import { getSelectContext } from '.';
	import { menuStyles } from '../menu';

	export let value = '';
	export let disabled = false;

	let className: string | undefined | null = undefined;
	export { className as class };

	const { option, isSelected } = getSelectContext();
	const { item } = menuStyles()
</script>

<li
	melt={$option({ value, disabled })}
	use:option
	class={cn(
		item(),
		'relative data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[selected]:font-medium pl-8 data-[selected]:bg-accent-500/20 data-[selected]:text-foreground data-[selected]:focus:bg-accent-500/30',
		className
	)}
>
	<slot />
	{#if $isSelected(value)}
	    <Check size=16 class="absolute left-2 top-1/2 -translate-y-1/2 text-accent-foreground"/>
	{/if}
</li>
