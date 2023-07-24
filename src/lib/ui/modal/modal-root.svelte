<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import Trigger from './modal-trigger.svelte';
	import Content from './modal-content.svelte';

	export let crossButton = true;
	export let alert = false;
	export let type: 'error' | 'warning' | 'success' | 'info' | undefined = undefined;
	export let drawer = false;
	export let side: 'left' | 'right' | 'top' | 'bottom' | undefined = drawer ? 'right' : undefined;
	export let open = false;
	export let closeOnOutsideClick = alert ? false : true;
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

	type DrawerProps = {
		drawer: boolean;
		side?: 'left' | 'right' | 'top' | 'bottom';
	};

	type DialogProps = {
		alert?: never;
		type?: never;
		drawer?: never;
		side?: never;
	};

	type $$Props = BaseDialogProps & (AlertDialogProps | DrawerProps | DialogProps);
  const dispatch = createEventDispatcher();

	const dialog = createDialog({
		role: alert ? 'alertdialog' : 'dialog',
		closeOnOutsideClick,
		preventScroll,
	});
 const { open: openStore, close, trigger} = dialog;
	setContext('dialog', {
		...dialog,
		alert,
		type: alert ? type : undefined,
		drawer,
		side: drawer ? side : undefined,
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
<!-- 
<svelte:head>
	<meta name="theme-color" content="hsl(240 10% 4%)" media="(prefers-color-scheme: dark)"/>
	<meta name="theme-color" content="hsl(0 0% 98%)" media="(prefers-color-scheme: light)" />
</svelte:head> -->

<slot {Trigger} {Content} close={$close} trigger={$trigger} {open}/>
