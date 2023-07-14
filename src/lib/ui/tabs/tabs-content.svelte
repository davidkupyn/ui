<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { getTabsContext } from '.';
	const { content } = getTabsContext();
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
</script>

<div melt={$content(value)} class={cn('flex-1 p-4 mt-2 overflow-y-auto focus:outline-none focus-visible:ring-2 transition ring-muted rounded-xl', className)}>
	<slot />
</div>
