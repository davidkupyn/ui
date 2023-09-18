<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';
	import Content from './tabs-content.svelte';
	import List from './tabs-list.svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	export let value = '';
	export let loop = false;
	export let activateOnFocus = true;
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	const dispatch = createEventDispatcher();

	const tabs = ctx.set({
		defaultValue: value,
		loop,
		activateOnFocus,
		orientation,
		onValueChange: ({ next }) => {
			value = next;
			dispatch('change', next);
			return next;
		}
	});
	const {
		elements: { root },
		states: { value: valueStore },
		options
	} = tabs;

	let className: string | undefined | null = undefined;
	export { className as class };
	setContext('tabs', tabs);

	$: valueStore.set(value);
	$: options.loop.set(loop);
	$: options.activateOnFocus.set(activateOnFocus);
	$: options.orientation.set(orientation);
</script>

<div
	use:root
	{...$root}
	class={cn('flex flex-col data-[orientation=vertical]:flex-row', className)}
>
	<slot {List} {Content} />
</div>
