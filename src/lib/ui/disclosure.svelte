<script lang="ts">
	import { ChevronUp } from 'lucide-svelte';

	export let defaultExpanded = false;
	export let expanded = defaultExpanded;
	export let summary: string;
	export let label = summary;
	export let content: string;
</script>

<div class="w-full">
	<button
		on:click={() => (expanded = !expanded)}
		class="btn ghost w-full justify-between"
		aria-expanded={expanded}
		aria-label={label}
	>
		<span>{summary}</span>
		<ChevronUp
			class="h-5 w-5 text-primary-500 dark:text-primary-600 transition {expanded
				? 'rotate-180 transform'
				: ''}"
		/>
	</button>
	<div
		class="grid transition-all ease-in-out
					{expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}"
	>
		<div
			class="px-4 {expanded
				? 'mt-2'
				: ''} transition-all ease-in-out text-sm text-gray-500 dark:text-gray-400 overflow-hidden"
		>
			{content}
		</div>
	</div>
</div>
