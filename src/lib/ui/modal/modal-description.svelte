<script lang="ts">
	import { modal, ctx } from '.';

	const {
		elements: { description }
	} = ctx.get();
</script>

<p class={modal().description()} use:description {...$description}>
	<slot />
</p>
