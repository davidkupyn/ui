<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import Content from './disclosure-content.svelte';
	import Trigger from './disclosure-trigger.svelte';
	import { createCollapsible } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	export let disabled = false;
	export let defaultOpen = false;
	export let unstyled = false;
	export let open = defaultOpen;
	const disclosure = createCollapsible({
		open,
		disabled
	});
	const { root, open: openStore } = disclosure;
	let className: string | undefined | null = undefined;
	export let details: string | undefined = undefined;
	export let summary: string | undefined = undefined;
	export { className as class };
	setContext('disclosure', {unstyled, ...disclosure});
	const dispatch = createEventDispatcher();

	 $: openStore.set(open)
  openStore.subscribe((v) => {
		open = v;
		dispatch('change', v);
	})
</script>

<div class={cn('group', className)} melt={$root}>
	<slot {Trigger} {Content} open={$openStore}>
		<Trigger>
			<slot name="summary">{summary}</slot>
		</Trigger>
		<Content>
			<slot name="details">{details}</slot>	
		</Content>
	</slot>
</div>
