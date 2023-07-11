<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import Trigger from './modal-trigger.svelte';
	import Content from './modal-content.svelte';

	export let crossButton = true;
	export let alert = false;
	export let type: 'error' | 'warning' | 'success' | 'info' | undefined = undefined;
	export let open = false;
	export let closeOnOutsideClick = true;
	export let preventScroll = true;

	type BaseDialogProps = {
		open?: boolean;
		crossButton?: boolean;
		class?: string;
		closeOnOutsideClick?: boolean;
		preventScroll?: boolean;
	};

	type AlertDialogProps = {
		alert: boolean;
		type?: 'error' | 'warning' | 'success' | 'info';
	};

	type DialogProps = {
		alert?: never;
		type?: never;
	};

	type $$Props = BaseDialogProps & (AlertDialogProps | DialogProps);
  const dispatch = createEventDispatcher();

	const dialog = createDialog({
		role: alert ? 'alertdialog' : 'dialog',
		closeOnOutsideClick: !alert && closeOnOutsideClick,
		preventScroll,		
	});
 const { open: openStore, close, trigger} = dialog;
	setContext('dialog', {
		...dialog,
		alert,
		type,
		crossButton
	});

	$: openStore.set(open)

  openStore.subscribe((v) => {
    open = v;
		dispatch('change', v);
		if (v) dispatch('open');
		else dispatch('close');
	})
	export { trigger, close }
</script>

<slot {Trigger} {Content} close={$close}/>
