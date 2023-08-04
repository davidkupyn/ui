<script lang="ts">
	import { ctx } from '.';
	import { cn } from '$lib/helpers/style';
	import { createEventDispatcher } from 'svelte';
	import Radio from './radio-item.svelte';

	export let value: string | undefined = undefined;
	export let disabled = false;
	export let name: string | undefined = undefined;
	export let loop = false;
	export let orientation: 'horizontal' | 'vertical' = 'vertical';
	export let required = false;
	let className: string | undefined | null = undefined;
	export { className as class };

	const dispatch = createEventDispatcher();

	const radioGroup = ctx.set({
		defaultValue: value,
		onValueChange: ({ next }) => {
			value = next;
			dispatch('change', next);
			return next;
		},
		disabled,
		loop,
		orientation,
		required
	});

	const {
		elements: { root },
		states: { value: valueStore }
	} = radioGroup;

	$: valueStore.set(value || '');
</script>

<div
	use:root
	{...$root}
	class={cn('flex flex-col gap-3 data-[orientation=horizontal]:flex-row', className)}
	aria-label="View density"
>
	<slot {Radio} />
	<input type="hidden" {name} {value} {disabled} />
</div>
