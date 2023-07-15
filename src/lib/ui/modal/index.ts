import type { createDialog } from '@melt-ui/svelte';
import { getContext } from 'svelte';
import { tv } from 'tailwind-variants';

export { default as Modal } from './modal-root.svelte';

export const modal = tv({
	slots: {
		base: 'relative z-50 grid w-full sm:max-w-lg shadow-lg focus:outline-none rounded-3xl border border-popover-border bg-popover p-6 gap-6 rounded-t-3xl [--modal-scale:1] sm:[--modal-scale:0.95] [--modal-y:10rem] sm:[--modal-y:0px] [--modal-duration:300] sm:[--modal-duration:200] dark:[box-shadow:_inset_0_1px_0.5px_0px_hsl(0_0%_100%/0.06)]',
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
