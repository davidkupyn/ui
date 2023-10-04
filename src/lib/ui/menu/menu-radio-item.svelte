<script lang="ts">
	import { cn } from '$lib/helpers';
	import { ctx, menuStyles } from '.';

	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = ctx.radioGroup.get();

	export let value: string;
	export let disabled = false;
	let className = '';
	const { item } = menuStyles();
	export { className as class };
</script>

<div
	class={cn(item(), 'relative pl-8', className)}
	{...$radioItem({ value, disabled })}
	use:radioItem
>
	{#if $isChecked(value)}
		<span class="absolute left-3 rounded-full w-1.5 h-1.5 bg-foreground top-1/2 -translate-y-1/2" />
	{/if}
	<slot />
	{#if $$slots.after}
		<span class="ml-auto">
			<slot name="after" />
		</span>
	{/if}
</div>
