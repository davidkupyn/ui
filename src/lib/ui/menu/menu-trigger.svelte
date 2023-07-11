<script lang="ts">
	import { getMenuContext } from '.';
	const { trigger } = getMenuContext();

	let className = '';
	export { className as class };
</script>

<button use:trigger on:click|stopPropagation {...$trigger} class={className}>
	<slot />
</button>
