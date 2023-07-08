<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getTabsContext } from '.';
	const { content } = getTabsContext();
	let className = '';
	export { className as class };
	export let value: string;
</script>

<div {...$content(value)} class={cn('flex-1 p-4 overflow-y-auto', className)}>
	<slot />
</div>
