import type { createDialog } from '@melt-ui/svelte';
import { getContext } from 'svelte';
import { tv } from 'tailwind-variants';

export { default as Modal } from './modal-root.svelte';

export const modal = tv({
	slots: {
		base: 'relative z-50 grid w-full sm:max-w-lg shadow-lg focus:outline-none sm:rounded-3xl sm:border border-popover-border bg-popover backdrop-blur-md p-6 gap-6 max-sm:pb-12 rounded-t-3xl border-t [--modal-scale:1] sm:[--modal-scale:0.95] [--modal-y:10rem] sm:[--modal-y:0px] [--modal-duration:200]',
		title: 'font-semibold text-md sm:text-lg leading-none tracking-tight flex items-center',
		description: 'text-sm text-muted-foreground'
	},
	variants: {
		hasIcon: {
			true: {
				title: 'gap-2'
			}
		}
	}
});

export const getModalContext = () =>
	getContext<
		ReturnType<typeof createDialog> & {
			alert: boolean;
			type: 'info' | 'success' | 'warning' | 'error';
			crossButton: boolean;
		}
	>('dialog');
