<script lang="ts">
	import { getMenuContext } from '.';
	import Button from '../button.svelte';
	const { trigger } = getMenuContext();

	let className: string | undefined | null = undefined;
	export { className as class };

</script>

<Button use={[trigger]} on:click {...$trigger} class={className} {...$$restProps}>
	<slot />
</Button>
