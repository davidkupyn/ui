<script lang="ts">
	import { ctx } from '.';
	import Button from '../button.svelte';
	const {
		elements: { trigger }
	} = ctx.get();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Button melt={$trigger} class={className} {...$$restProps}>
	<slot />
</Button>
