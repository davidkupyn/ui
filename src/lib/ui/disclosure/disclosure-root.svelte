<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import Content from './disclosure-content.svelte';
	import Trigger from './disclosure-trigger.svelte';
	import { createCollapsible } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	export let disabled = false;
	export let defaultOpen = false;
	export let open = defaultOpen;
	const disclosure = createCollapsible({
		open,
		disabled
	});
	const { root, open: openStore } = disclosure;
	let className = '';
	export { className as class };
	setContext('disclosure', disclosure);
	const dispatch = createEventDispatcher();

	 $: openStore.set(open)
  openStore.subscribe((v) => {
		open = v;
		dispatch('change', v);
	})
</script>

<div class={cn('group', className)} {...root}>
	<slot {Trigger} {Content} open={$openStore} />
</div>
