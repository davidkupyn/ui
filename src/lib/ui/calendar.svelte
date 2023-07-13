<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { createCalendar } from './headless/calendar';
	import Button from './button.svelte';

	const { calendar, nextButtonAttrs, prevButtonAttrs, title, days, weekdays, selected } =
		createCalendar();
	export let value = $selected[0];

	$: value = $selected[0];
</script>

<div
	use:calendar
	class="flex w-80 flex-col overflow-clip rounded-3xl border border-popover-border bg-popover p-4 backdrop-blur-md shadow-lg ring-opacity-5 focus:outline-none"
>
	<div class="mb-4 flex items-center justify-between">
		<Button
			variant="ghost"
			size="icon"
			type="button"
			{...$prevButtonAttrs}
			aria-label="Previous month"
		>
			<ChevronLeft size=20 />
		</Button>
		<div class="flex-grow text-center font-semibold">{$title}</div>
		<Button
			variant="ghost"
			size="icon"
			type="button"
			{...$nextButtonAttrs}
			aria-label="Next month"
		>
			<ChevronRight size=20 />
		</Button>
	</div>
	<div>
		<div class="mb-2 grid w-full grid-cols-7 gap-1 text-center text-xs font-medium uppercase">
			{#each $weekdays as weekday, i}
				<div aria-label={weekday} class="btn-text">{weekday.slice(0, 3)}</div>
			{/each}
		</div>
		<div role="grid" class="grid w-full grid-cols-7 gap-1">
			{#each $days as day}
				<div
					role="gridcell"
					class="cursor-pointer btn btn-icon data-[selected=false]:text-muted-foreground data-[selected=false]:btn-ghost max-sm:text-base"
					{...day.dayAttrs}
					class:opacity-50={day.isOutOfMonth &&
						!$selected.includes(day.date.toISOString().split('T')[0])}
					data-selected={$selected.includes(day.date.toISOString().split('T')[0])}
				>
					<slot name="day" {...day}>
						{day.date.getDate()}
					</slot>
				</div>
			{/each}
		</div>
	</div>
</div>
