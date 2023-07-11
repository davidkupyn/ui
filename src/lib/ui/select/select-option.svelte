<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { Check } from 'lucide-svelte';
	import { getSelectContext } from '.';

	export let value = '';
	export let disabled = false;

	let className = '';
	export { className as class };

	const { option, isSelected } = getSelectContext();
</script>

<li
	{...$option({ value, disabled })}
	use:option
	class={cn(
		'relative data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed transition focus:outline-none rounded-xl sm:text-sm truncate data-[selected]:font-medium text-muted-foreground cursor-pointer select-none h-9 flex items-center pl-10 pr-2 data-[selected]:bg-accent-500/20 data-[selected]:text-foreground focus:bg-muted data-[selected]:focus:bg-accent-500/30 focus:text-foreground',
		className
	)}
>
	<slot />
	{#if $isSelected(value)}
		<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-foreground">
			<Check class="h-5 w-5" />
		</span>
	{/if}
</li>
