<script lang="ts">
	import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { crossfade } from 'svelte/transition';
	import { createPagination } from '@melt-ui/svelte';

	let desirablePage: number;
	export let totalPages: number;
	export let animationDuration = 200;
	export let pushHistory = false;
	export let page = 1;
	export let mode: 'navigate' | 'select' = 'navigate';

	const currentPage = queryParam('page', ssp.number(), {
		pushHistory
	});

	let innerWidth = 0;

	const { prevButton, nextButton, pages, pageTrigger, root, page: pageStore, options } = createPagination({
		count: totalPages,
		page: mode === 'navigate' ? ($currentPage ?? undefined) : page,
		perPage: 1,
	});

	const [send, receive] = crossfade({});

	$: pageStore.set(page);

	$: {
		if (innerWidth < 640 && $options.siblingCount !== 0) {
			$options.siblingCount = 0;
		} else if (innerWidth >= 640 && $options.siblingCount !== 1) {
			$options.siblingCount = 1;
		}
	}

	pageStore.subscribe((value) => {
		if (value !== page) {
			page = value;
		}
		if (mode === 'navigate') {
			currentPage.set(value);
		}

		if (value> totalPages || value < 1) {
			pageStore.set(1);
		}
	});
</script>

<svelte:window bind:innerWidth />

<nav
	class="mx-auto flex gap-4 max-sm:flex-col items-center max-sm:gap-8"
	aria-label="pagination"
	{...$root}
>
	<div class="flex gap-1 items-center">
		<button
			{...$prevButton}
			use:prevButton
			class="btn btn-ghost btn-icon"
			disabled={!$pageStore || $pageStore === 1 || totalPages <= 1}
		>
			<ArrowLeft size=20 />
		</button>
		{#each $pages as page, index (page.key)}
			{#if page.type === 'page'}
				{@const isCurrentPage = $pageStore === page.value}
				<button
					{...$pageTrigger(page)}
					use:pageTrigger
					class="relative btn-icon btn btn-text"
					data-first={index === 0}
					data-last={index === $pages.length - 1}
				>
					<span class="absolute text-sm p-1 inset-0 grid place-items-center z-[2]">
						{page.value}
					</span>
					{#if isCurrentPage}
						<div
							in:receive={{
								key: 'background',
								easing: cubicOut,
								duration: animationDuration
							}}
							out:send={{ key: 'background', easing: cubicOut, duration: animationDuration }}
							class="w-full h-full rounded-xl bg-muted"
						/>
					{/if}
				</button>
			{:else}
				<span class="p-2 text-muted-foreground">...</span>
			{/if}
		{/each}

		<button
			{...$nextButton}
			use:nextButton
			class="btn btn-ghost btn-icon"
			disabled={($pageStore && $pageStore >= totalPages) || totalPages <= 1}
		>
			<ArrowRight size=20 />
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
					($pageStore =
						desirablePage && desirablePage > 0 && desirablePage <= totalPages
							? desirablePage
							: $pageStore)}
			>
				Go <ChevronRight class="group-hover:ml-0.5 transition-[margin] h-4 w-4" size=16 />
			</button>
		</form>
	{/if}
</nav>
