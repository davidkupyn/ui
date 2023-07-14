<script lang="ts">
	import { getHoverCardContext } from '.';
	const { trigger } = getHoverCardContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div melt={$trigger} class={className} {...$$restProps}>
	<slot />
</div>
