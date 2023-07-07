<script lang="ts">
	import { dialog, getDialogContext } from '.';

	const { description } = getDialogContext();
</script>

<p class={dialog().description()} {...$description}>
	<slot />
</p>
