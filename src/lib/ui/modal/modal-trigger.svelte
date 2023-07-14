<script lang="ts">
	import { getModalContext } from '.';
	import Button from '../button.svelte';
	const { trigger } = getModalContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Button melted={$trigger} class={className} {...$$restProps}>
	<slot />
</Button>
