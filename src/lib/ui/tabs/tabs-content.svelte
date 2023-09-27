<script lang="ts">
	import { cn } from '$lib/helpers/style';
	import { ctx } from '.';
	const {
		elements: { content }
	} = ctx.get();
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string;
</script>

<div
	use:content
	{...$content(value)}
	class={cn(
		'flex-1 p-4 mt-2 overflow-y-auto focus:outline-none focus-visible:ring-2 transition ring-muted rounded',
		className
	)}
>
	<slot />
</div>
