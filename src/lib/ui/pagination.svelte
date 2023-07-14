<script lang="ts">
	import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { crossfade } from 'svelte/transition';
	import { createPagination } from '@melt-ui/svelte';
	import Button from './button.svelte';

	let desirablePage: number;
	export let totalPages: number;
	export let animationDuration = 200;
	export let pushHistory = false;
	export let page = 1;
	export let mode: 'navigate' | 'select' = 'navigate';
	const currentPage = queryParam('page', ssp.number(
		mode === 'navigate' ? page : undefined
	), {
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
		page = value;
		if (mode === 'navigate') {
			currentPage.set(value);
		}

		if (value > totalPages || value < 1) {
			pageStore.set(1);
		}
	});
</script>

<svelte:window bind:innerWidth />

<nav
	class="mx-auto flex gap-4 max-sm:flex-col items-center max-sm:gap-8"
	aria-label="pagination"
	melt={$root}
>
	<div class="flex gap-1 items-center">
		<Button 
			variant="ghost" 
			size="icon"
			melted={$prevButton}
			disabled={!$pageStore || $pageStore === 1 || totalPages <= 1}
		>
			<ArrowLeft size=20 />
		</Button>
		{#each $pages as page (page.key)}
			{#if page.type === 'page'}
				{@const isCurrentPage = $pageStore === page.value}
				<Button
					melted={$nextButton}
					size="icon"
					variant="text"
					class="relative"
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
							class="w-full h-full rounded-xl bg-muted [box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.06)]"
						/>
					{/if}
				</Button>
			{:else}
				<span class="p-2 text-muted-foreground">...</span>
			{/if}
		{/each}
		
		<Button 
			variant="ghost" 
			size="icon"
			melted={$nextButton}
			disabled={($pageStore && $pageStore >= totalPages) || totalPages <= 1}
		>
			<ArrowRight size=20 />
		</Button>
	</div>

	{#if totalPages > 1}
		<form class="flex gap-2 max-sm:gap-4" on:submit|preventDefault={() =>
					($pageStore =
						desirablePage && desirablePage > 0 && desirablePage <= totalPages
							? desirablePage
							: $pageStore)}>
			<input
				min="1"
				max={totalPages}
				type="number"
				placeholder="1-{totalPages}"
				inputmode="numeric"
				class="w-16 input"
				bind:value={desirablePage}
			/>
			<Button
				variant="ghost"
				class="group hover:pr-3.5 transition-all"
			>
				Go <ChevronRight class="group-hover:ml-0.5 transition-[margin] h-4 w-4" size=16 />
			</Button>
		</form>
	{/if}
</nav>
