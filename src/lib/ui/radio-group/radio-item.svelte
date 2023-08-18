<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers/style';
	import { uuid } from '$lib/helpers/uuid';
	import { scale } from 'svelte/transition';

	export let value: string;
	export let disabled = false;
	export let id = uuid();
	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { item },
		helpers: { isChecked }
	} = ctx.get();
</script>

<svelte:element
	this={$$slots.default ? 'label' : 'div'}
	class={cn('flex items-center gap-3', className)}
	data-state={$isChecked(value) ? 'checked' : 'unchecked'}
	aria-checked={$isChecked(value)}
>
	<button
		use:item
		{...$item({ value, disabled })}
		class="h-5 w-5 sm:h-4 sm:w-4 my-1 focus:outline-none shrink-0 cursor-pointer data-[state=checked]:bg-accent ring-1 ring-foreground/20 data-[state=checked]:ring-accent shadow rounded-full grid place-content-center focus-visible:ring-2 bg-background text-accent outline-0 focus-visible:ring-offset-background focus-visible:ring-offset-2"
		aria-labelledby="{id}-label"
		{id}
	>
		{#if $isChecked(value)}
			<div
				transition:scale={{ start: 0.5 }}
				class="h-2 w-2 sm:h-1.5 sm:w-1.5 rounded-full bg-background shadow"
			/>
		{/if}
	</button>
	<slot>
		<label class="capitalize leading-none w-full" id="{id}-label" for={id}>
			{value}
		</label>
	</slot>
</svelte:element>
