<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	let expandedId = writable(0);

	let id = 1;
</script>

<script lang="ts">
	import { ChevronUp } from 'lucide-svelte';

	export let defaultExpanded = false;
	export let expanded = defaultExpanded;
	export let summary: string = '';
	export let content: string = '';
	export let label = summary;
	const componentId = id++;
	$: expanded = $expandedId === componentId;
</script>

<div class="w-full">
	<button
		on:click={() => ($expandedId = expanded ? 0 : componentId)}
		class="btn btn-ghost w-full justify-between {expanded ? 'text-base-950 dark:text-base-50' : ''}"
		aria-expanded={expanded}
		aria-label={label}
	>
		<span class="inline-flex gap-2 items-center">
			<slot name="icon" />
			<slot name="summary">{summary}</slot>
		</span>
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
			<slot name="content">
				{content}
			</slot>
		</div>
	</div>
</div>
