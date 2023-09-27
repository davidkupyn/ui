<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';
	import Button from '../button.svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="px-4 py-3 w-[356px] bg-popover border border-popover-border rounded-xl space-y-1">
	<p class="font-medium text-sm">Account Saved</p>
	<p class="text-muted-foreground text-sm">You can always revoke the changes.</p>
	<Button
		size="icon"
		variant="text"
		class="h-8 w-8 absolute right-1.5 top-0.5"
		on:click={() => dispatch('closeToast')}
	>
		<X size="16" />
	</Button>
</div>
