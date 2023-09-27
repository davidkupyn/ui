<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { createCheckbox, type CreateCheckboxProps } from '@melt-ui/svelte';
	import { Check, Minus } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

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
		states: { checked: checkedStore },
		options
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
	$: options.disabled.set(disabled ?? false);
	$: checkedStore.set(checked);
</script>

<button
	{disabled}
	use:root
	{...$root}
	class={cn(
		'my-1 h-5 w-5 shrink-0 cursor-pointer transition disabled:opacity-50 disabled:pointer-events-none  border-0 ring-1 ring-foreground/25 data-[state=unchecked]:hover:bg-muted bg-background data-[state=checked]:bg-accent shadow outline-0 data-[state=checked]:ring-accent focus-visible:ring-border focus-visible:ring-offset-2 focus:ring-1 focus:ring-offset-0 focus:data-[state=checked]:ring-accent focus-visible:ring-2 focus-visible:border data-[state=checked]:focus-visible:border-accent focus-visible:border-foreground/20 focus-visible:ring-offset-background data-[state=checked]:focus-visible:ring-accent sm:h-4 sm:w-4 rounded-sm',
		className
	)}
	{...$$restProps}
>
	<div class={cn('flex items-center justify-center text-background overflow-hidden')}>
		{#if $isChecked}
			<span in:scale={{ start: 0.5, duration: 150 }}>
				<Check class="drop-shadow-sm w-4 h-4 sm:w-3.5 sm:h-3.5" />
			</span>
		{:else if $isIndeterminate}
			<span in:scale={{ start: 0.5, duration: 150 }}>
				<Minus class="drop-shadow-sm w-4 h-4 sm:w-3.5 sm:h-3.5" />
			</span>
		{/if}
	</div>
</button>
