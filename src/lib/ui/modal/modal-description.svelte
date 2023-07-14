<script lang="ts">
	import { modal, getModalContext } from '.';

	const { description } = getModalContext();
</script>

<p class={modal().description()} melt={$description}>
	<slot />
</p>
