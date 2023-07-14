<script lang="ts">
	import { getPopoverContext } from '.';
	const { trigger } = getPopoverContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<button on:click|stopPropagation melt={$trigger} class={className} {...$$restProps}>
	<slot />
</button>
