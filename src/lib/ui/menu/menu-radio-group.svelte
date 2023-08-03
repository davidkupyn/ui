<script lang="ts">
	import { ctx } from '.';
	import Radio from './menu-radio-item.svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string | undefined = undefined;
	const dispatch = createEventDispatcher();

	const radioGroup = ctx.radioGroup.set({
		defaultValue: value,
		onValueChange: ({ next }) => {
			value = next || undefined;
			dispatch('change', next);
			return next;
		}
	});
	const {
		elements: { radioGroup: root },
		states: { value: valueStore }
	} = radioGroup;
	$: valueStore.set(value || null);
</script>

<div use:root {...$root}>
	<slot {Radio} />
</div>
