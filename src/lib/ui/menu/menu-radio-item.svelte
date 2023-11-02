<script lang="ts">
	import { cn } from '$lib/helpers';
	import { ctx, menuStyles } from '.';

	const {
		elements: { radioItem }
	} = ctx.radioGroup.get();

	export let value: string;
	export let disabled = false;
	let className = '';
	const { item } = menuStyles();
	export { className as class };
</script>

<div
	class={cn(item(), 'group relative pl-8', className)}
	{...$radioItem({ value, disabled })}
	use:radioItem
>
	<span
		class="group-aria-checked:block hidden absolute left-3 rounded-full w-1.5 h-1.5 bg-foreground top-1/2 -translate-y-1/2"
	/>
	<slot />
	{#if $$slots.after}
		<span class="ml-auto">
			<slot name="after" />
		</span>
	{/if}
</div>
