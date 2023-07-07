<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import Trigger from './trigger.svelte';
	import Content from './content.svelte';

	export let crossButton = true;
	export let alert = false;
	export let type: 'error' | 'warning' | 'success' | 'info' | undefined = undefined;

	type AlertDialogProps = {
		crossButton?: boolean;
		class?: string;
		alert: boolean;
		type?: 'error' | 'warning' | 'success' | 'info';
	};

	type DialogProps = {
		crossButton?: boolean;
		class?: string;
		alert?: never;
		type?: never;
	};

	type $$Props = AlertDialogProps | DialogProps;

	const dialog = createDialog({
		role: alert ? 'alertdialog' : 'dialog',
		closeOnOutsideClick: !alert
	});

	setContext('dialog', {
		...dialog,
		alert,
		type,
		crossButton
	});
</script>

<slot {Trigger} {Content} />
