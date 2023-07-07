<script lang="ts">
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
	const { root } = disclosure;
	let className = '';
	export { className as class };

	setContext('disclosure', disclosure);
</script>

<div class={className} {...root}>
	<slot {Trigger} {Content} />
</div>
