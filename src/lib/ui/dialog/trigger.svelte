<script lang="ts">
	import { getDialogContext } from '.';
	const { trigger } = getDialogContext();

	let className = '';
	export { className as class };
</script>

<button use:trigger {...$trigger} class={className} {...$$restProps}>
	<slot />
</button>
