<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createCheckbox, type CreateCheckboxProps } from '@melt-ui/svelte';
	import { Check, Minus } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let checked: boolean | 'indeterminate' = false;
	export let disabled: CreateCheckboxProps['disabled'] = undefined;
	export let name: CreateCheckboxProps['name'] = undefined;
	export let required: CreateCheckboxProps['required'] = undefined;
	export let value: CreateCheckboxProps['value'] = undefined;
	export let group: (string | undefined)[] = [];
	const dispatch = createEventDispatcher();

	const {
		elements: { root },
		helpers: { isChecked, isIndeterminate },
		states: { checked: checkedStore }
	} = createCheckbox({
		defaultChecked: checked,
		onCheckedChange: ({ next }) => {
			checked = next;
			dispatch('change', next);
			if (next) group.push(value);
			else group.filter((v) => v !== value);

			return next;
		},
		disabled,
		name,
		required,
		value
	});
	// $: checked = group?.includes(value);
	$: checkedStore.set(checked);
</script>

<button
	use:root
	{...$root}
	class={cn(
		'my-1 h-5 w-5 shrink-0 cursor-pointer transition rounded-md border-0 ring-1 ring-foreground/20 data-[state=unchecked]:hover:bg-muted bg-background data-[state=checked]:bg-accent shadow outline-0 data-[state=checked]:ring-accent focus-visible:ring-border focus-visible:ring-offset-2 focus:ring-1 focus:ring-offset-0 focus:data-[state=checked]:ring-accent focus-visible:ring-2 focus-visible:border focus-visible:border-border focus-visible:ring-offset-background data-[state=checked]:focus-visible:ring-accent sm:h-4 sm:w-4 sm:rounded',
		className
	)}
	{...$$restProps}
>
	<div
		transition:fly={{ y: -10, duration: 150 }}
		class={cn('flex items-center justify-center text-base-50 overflow-hidden')}
	>
		{#if $isChecked}
			<span in:scale={{ start: 0.9, duration: 200 }}>
				<Check class="drop-shadow-sm" size="14" />
			</span>
		{:else if $isIndeterminate}
			<span in:scale={{ start: 0.9, duration: 200 }}>
				<Minus class="drop-shadow-sm" size="14" />
			</span>
		{/if}
	</div>
</button>
