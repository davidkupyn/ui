<script context="module" lang="ts">
	import { cn } from '$lib/helpers/style';
	import { writable } from 'svelte/store';

	let expandedId = writable(0);

	let id = 1;
</script>

<script lang="ts">
	import { ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let defaultExpanded = false;
	export let expanded = defaultExpanded;
	export let summary: string = '';
	export let content: string = '';
	export let label = summary;
	export let independent = false;
	export const toggle = toggleDisclosure;
	let className = '';
	export { className as class };
	const componentId = id++;
	$: expanded = independent ? expanded : $expandedId === componentId;

	function toggleDisclosure() {
		dispatch('toggle', { expanded: !expanded });
		if (independent) {
			expanded = !expanded;
		} else {
			$expandedId = expanded ? 0 : componentId;
		}
	}
</script>

<div class="w-full">
	<button
		on:click|stopPropagation={toggleDisclosure}
		class={cn(
			'btn btn-ghost active:scale-100 w-full justify-between',
			expanded && 'text-foreground',
			className
		)}
		aria-expanded={expanded}
		aria-label={label}
	>
		<span class="inline-flex gap-2 items-center my-1">
			<slot name="icon" />
			<slot name="summary">{summary}</slot>
		</span>
		<ChevronUp
			size={16}
			class={cn('h-4 w-4 text-primary transition', expanded && 'rotate-180 transform')}
		/>
	</button>
	{#if expanded}
		<div
			transition:slide={{ duration: 150, easing: cubicInOut }}
			class="px-4 mt-2 text-sm text-muted-foreground overflow-hidden"
		>
			<slot name="content">
				{content}
			</slot>
		</div>
	{/if}
</div>
