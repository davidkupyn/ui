<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { createToggleGroup } from '@melt-ui/svelte';
	import { cn } from '$lib/helpers/style';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const { root, item, value } = createToggleGroup();

	const [send, receive] = crossfade({});

	export let tabs: string[];
	export let disabled: string[] = [];
	export { $value as value };
	export let duration = 300;
	export let transparent = false;

	// binding changes of value in the parent component to the local value would be nice.
</script>

<div class="flex items-center w-full h-10 p-1 gap-2" {...$root}>
	{#each tabs as tab (tab)}
		<button
			on:click={() => dispatch('change', tab)}
			class="group relative btn btn-text w-full h-full p-0 rounded-lg"
			{...$item(tab)}
			disabled={disabled.includes(tab)}
		>
			{#if tab === $value}
				<div
					in:receive|local={{ key: 'tab', easing: cubicOut, duration }}
					out:send|local={{ key: 'tab', easing: cubicOut, duration }}
					class={cn(
						'w-full h-full rounded-lg overflow-hidden bg-base-300/50 dark:bg-base-800/50',
						transparent && 'bg-base-50 dark:bg-base-950'
					)}
				>
					<slot name="background" />
				</div>
			{/if}
			<span
				class="capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-aria-pressed:scale-100 scale-95 transition-[transform]"
			>
				<slot name="tab" {tab}>
					{tab}
				</slot>
			</span>
		</button>
	{/each}
</div>
