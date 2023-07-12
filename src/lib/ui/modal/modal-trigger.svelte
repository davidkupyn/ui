<script lang="ts">
	import { getModalContext } from '.';
	const { trigger } = getModalContext();

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<button use:trigger on:click|stopPropagation {...$trigger} class={className} {...$$restProps}>
	<slot />
</button>
