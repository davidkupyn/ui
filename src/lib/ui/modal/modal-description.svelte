<script lang="ts">
	import { modal, getModalContext } from '.';

	const { description } = getModalContext();
</script>

<p class={modal().description()} {...$description}>
	<slot />
</p>
