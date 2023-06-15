<script lang="ts">
	import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { crossfade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { createPagination } from '@melt-ui/svelte';

	let desirablePage: number;
	export let totalPages: number;
	export let animationDuration = 200;
	export let pushHistory = false;

	const currentPage = queryParam('page', ssp.number(), {
		pushHistory
	});

	const [send, receive] = crossfade({});

	onMount(() => {
		$currentPage = 1;
		if ($currentPage && $currentPage > totalPages) {
			$currentPage = 1;
		}
	});

	let innerWidth = 0;

	const { prevButton, nextButton, pages, pageTrigger, root, page, options } = createPagination({
		count: totalPages,
		perPage: 1
	});

	$: {
		if (innerWidth < 640 && $options.siblingCount !== 0) {
			$options.siblingCount = 0;
		} else if (innerWidth >= 640 && $options.siblingCount !== 1) {
			$options.siblingCount = 1;
		}
	}

	$: $currentPage = $page;
</script>

<svelte:window bind:innerWidth />

<nav
	class="mx-auto flex gap-4 max-sm:flex-col items-center max-sm:gap-8"
	aria-label="pagination"
	{...root}
>
	<div class="flex gap-1 items-center">
		<button
			{...$prevButton}
			class="btn btn-ghost p-2 h-fit"
			disabled={!$currentPage || $currentPage === 1 || totalPages <= 1}
		>
			<ArrowLeft size={20} />
		</button>
		{#each $pages as page, index (page.key)}
			{#if page.type === 'page'}
				{@const isCurrentPage = $currentPage === page.value}
				<button
					{...$pageTrigger(page)}
					class="relative h-9 w-9 p-0 btn btn-text"
					data-first={index === 0}
					data-last={index === $pages.length - 1}
				>
					<span class="absolute text-sm p-1 inset-0 grid place-items-center z-[2]">
						{page.value}
					</span>
					{#if isCurrentPage}
						<div
							in:receive|local={{
								key: 'background',
								easing: cubicOut,
								duration: animationDuration
							}}
							out:send|local={{ key: 'background', easing: cubicOut, duration: animationDuration }}
							class="w-full h-full rounded-xl bg-base-300/50 dark:bg-base-800/50"
						/>
					{/if}
				</button>
			{:else}
				<span class="p-2 text-base-400 dark:text-base-600">...</span>
			{/if}
		{/each}

		<button
			{...$nextButton}
			class="btn btn-ghost p-2 h-fit"
			disabled={($currentPage && $currentPage >= totalPages) || totalPages <= 1}
		>
			<ArrowRight size={20} />
		</button>
	</div>

	{#if totalPages > 1}
		<form class="flex gap-2 max-sm:gap-4" on:submit|preventDefault>
			<input
				min="1"
				max={totalPages}
				type="number"
				placeholder="1-{totalPages}"
				inputmode="numeric"
				class="w-16 input"
				bind:value={desirablePage}
			/>
			<button
				class="btn btn-ghost group hover:pr-3.5 transition-all"
				on:click={() =>
					($page =
						desirablePage && desirablePage > 0 && desirablePage <= totalPages
							? desirablePage
							: $page)}
			>
				Go <ChevronRight class="group-hover:ml-0.5 transition-[margin] h-4 w-4" size={16} />
			</button>
		</form>
	{/if}
</nav>
