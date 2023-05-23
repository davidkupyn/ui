<script lang="ts">
	import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { crossfade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let desirablePage: number;
	export let totalPages: number;
	export let animationDuration = 200;
	export let pushHistory = false;
	const currentPage = queryParam('page', ssp.number(), {
		pushHistory
	});

	const [send, receive] = crossfade({});

	function getPageList(currentPage = 1, totalPages: number, maxLength = 6) {
		function range(start: number, end: number) {
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		}
		let sideWidth = maxLength < 9 ? 1 : 2;
		let leftWidth = (2 - sideWidth * 2) >> 1;
		let rightWidth = (2 - sideWidth * 2) >> 1;

		if (totalPages <= maxLength) {
			return range(1, totalPages);
		}
		if (currentPage <= maxLength - sideWidth - 1 - rightWidth) {
			return range(1, maxLength - sideWidth - 1).concat(
				0,
				range(totalPages - sideWidth + 1, totalPages)
			);
		}

		if (currentPage >= totalPages - sideWidth - 1 - rightWidth) {
			return range(1, sideWidth).concat(
				0,
				range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
			);
		}

		return range(1, sideWidth).concat(
			0,
			range(currentPage - leftWidth - 1, currentPage + rightWidth + 1),
			0,
			range(totalPages - sideWidth + 1, totalPages)
		);
	}

	$: paginationPages = getPageList(Number($currentPage), totalPages);

	onMount(() => {
		$currentPage = 1;
		if ($currentPage && $currentPage > totalPages) {
			$currentPage = 1;
		}
	});
</script>

<div class="mx-auto flex gap-4 max-sm:flex-col items-center max-sm:gap-8">
	<div class="flex gap-1 items-center">
		<button
			on:click={() => ($currentPage &&= $currentPage - 1)}
			class="btn btn-ghost p-2 h-fit"
			disabled={!$currentPage || $currentPage === 1 || totalPages <= 1}
		>
			<ArrowLeft size={20} />
		</button>
		{#each paginationPages as page, index (index)}
			{#if page}
				<button
					on:click={() => ($currentPage = page)}
					aria-pressed={$currentPage === page}
					class="relative h-9 w-9 p-0 btn btn-text"
				>
					<span class="absolute text-sm p-1 inset-0 grid place-items-center z-[2]">
						{page}
					</span>
					{#if $currentPage === page}
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
			on:click={() => ($currentPage &&= $currentPage + 1)}
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
					($currentPage =
						desirablePage && desirablePage > 0 && desirablePage <= totalPages
							? desirablePage
							: $currentPage)}
			>
				Go <ChevronRight class="group-hover:ml-0.5 transition-[margin] h-4 w-4" size={16} />
			</button>
		</form>
	{/if}
</div>
