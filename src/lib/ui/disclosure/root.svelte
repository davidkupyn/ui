<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import Content from './content.svelte';
	import Trigger from './trigger.svelte';
	import { createCollapsible } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
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
</script>

<div class={cn('group', className)} {...root}>
	<slot {Trigger} {Content} open={$openStore} />
</div>
