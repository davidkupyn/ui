<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	let expandedId = writable(0);

	let id = 1;
</script>

<script lang="ts">
	import { ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let defaultExpanded = false;
	export let expanded = defaultExpanded;
	export let summary: string = '';
	export let content: string = '';
	export let label = summary;
	export let independent = false;
	export const toggle = toggleDisclosure;
	const componentId = id++;
	$: expanded = independent ? expanded : $expandedId === componentId;

	function toggleDisclosure() {
		if (independent) {
			expanded = !expanded;
		} else {
			$expandedId = expanded ? 0 : componentId;
		}
	}
</script>

<div class="w-full">
	<button
		on:click={toggleDisclosure}
		class="btn btn-ghost w-full justify-between {expanded ? 'text-base-950 dark:text-base-50' : ''}"
		aria-expanded={expanded}
		aria-label={label}
	>
		<span class="inline-flex gap-2 items-center my-1">
			<slot name="icon" />
			<slot name="summary">{summary}</slot>
		</span>
		<ChevronUp
			class="h-5 w-5 text-primary-500 dark:text-primary-600 transition {expanded
				? 'rotate-180 transform'
				: ''}"
		/>
	</button>
	{#if expanded}
		<div
			transition:slide={{ duration: 150, easing: cubicInOut }}
			class="px-4 mt-2 text-sm text-gray-500 dark:text-gray-400 overflow-hidden"
		>
			<slot name="content">
				{content}
			</slot>
		</div>
	{/if}
</div>
