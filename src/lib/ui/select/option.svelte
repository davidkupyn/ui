<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import type { createSelect } from '@melt-ui/svelte/index';
	import { Check } from 'lucide-svelte';
	import { getContext } from 'svelte';

	export let value = '';
	let className = '';
	export { className as class };

	const { option, isSelected } = getContext<ReturnType<typeof createSelect>>('select');
</script>

<li
	{...$option({ value })}
	class={cn(
		'relative transition focus:outline-none rounded-xl sm:text-sm truncate data-[selected]:font-medium text-base-500 dark:text-base-400 cursor-pointer select-none py-2 pl-10 pr-2 data-[selected]:bg-primary-600/20 data-[selected]:text-primary-900 data-[selected]:dark:text-primary-50 focus:bg-base-200 data-[selected]:focus:bg-primary-500/30 focus:dark:bg-base-800/50 focus:text-base-950 focus:dark:text-base-50',
		className
	)}
>
	<slot />
	{#if $isSelected(value)}
		<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
			<Check class="h-5 w-5" />
		</span>
	{/if}
</li>
