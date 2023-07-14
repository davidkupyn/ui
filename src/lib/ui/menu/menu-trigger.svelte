<script lang="ts">
	import { getMenuContext } from '.';
	import Button from '../button.svelte';
	const { trigger } = getMenuContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Button _melt={$trigger} on:click class={className} {...$$restProps}>
	<slot />
</Button>
