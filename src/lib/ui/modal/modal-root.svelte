<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Content from './modal-content.svelte';
	import { ctx } from '.';

	export let alert = false;
	export let crossButton = alert;
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

	const dialog = ctx.set({
		role: alert ? 'alertdialog' : 'dialog',
		closeOnOutsideClick,
		onOpenChange: ({ next }) => {
			open = next;
			dispatch('change', next);
			if (next) dispatch('open');
			else dispatch('close');

			return next;
		},
		preventScroll,
		props: {
			crossButton,
			alert,
			type,
			drawer,
			side: drawer ? side : undefined
		}
	});

	const {
		states: { open: openStore },
		elements: { trigger, close },
		options
	} = dialog;
	$: openStore.set(open);
	$: options.closeOnOutsideClick.set(closeOnOutsideClick);
	$: options.preventScroll.set(preventScroll);
	$: options.role.set(alert ? 'alertdialog' : 'dialog');
	$: options?.drawer?.set(drawer);
	$: options?.side?.set(drawer ? side : undefined);
	$: options?.alert?.set(alert);
	$: options?.type?.set(alert ? type : undefined);
	$: options?.crossButton?.set(crossButton);
	export { trigger, close };
</script>

<slot {Content} close={$close} trigger={$trigger} {open} />
