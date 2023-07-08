<script lang="ts">
	import { getHoverCardContext } from '.';
	const { trigger } = getHoverCardContext();

	let className = '';
	export { className as class };
</script>

<div use:trigger {...$trigger} class={className} {...$$restProps}>
	<slot />
</div>
