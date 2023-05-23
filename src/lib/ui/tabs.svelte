<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const [send, receive] = crossfade({});
	export let tabs: string[];
	export let disabled: string[] = [];
	export let currentTab: string = '';
	export let duration = 300;
	export let transparent = false;
</script>

<div class="flex items-center w-full h-10 p-1 gap-2">
	{#each tabs as tab (tab)}
		<button
			class="group relative btn btn-text w-full h-full p-0 rounded-lg"
			on:click={() => (currentTab = tab)}
			aria-pressed={tab === currentTab}
			disabled={disabled.includes(tab)}
		>
			{#if tab === currentTab}
				<div
					in:receive|local={{ key: 'tab', easing: cubicOut, duration }}
					out:send|local={{ key: 'tab', easing: cubicOut, duration }}
					class="w-full h-full rounded-lg overflow-hidden {transparent
						? 'bg-base-50 dark:bg-base-950'
						: 'bg-base-300/50 dark:bg-base-800/50'}"
				>
					<slot name="background" />
				</div>
			{/if}
			<span class="capitalize absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<slot name="tab" {tab}>
					{tab}
				</slot>
			</span>
		</button>
	{/each}
</div>
