import type { createDialog } from '@melt-ui/svelte';
import type { Action } from '@sveltejs/kit';
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { tv } from 'tailwind-variants';

export { default as Modal } from './modal-root.svelte';

export const modal = tv({
	slots: {
		base: 'relative z-50 grid shadow-lg focus:outline-none rounded-3xl border border-popover-border bg-popover p-6 gap-6 rounded-t-3xl [--modal-duration:300] sm:[--modal-duration:200] ',
		container: 'z-50 flex justify-center sm:items-center items-end fixed inset-0 p-2',
		title: 'font-semibold text-lg leading-none tracking-tight flex items-center',
		description: 'text-sm text-muted-foreground'
	},
	variants: {
		hasIcon: {
			true: {
				title: 'gap-2'
			}
		},
		drawer: {
			true: {
				base: '[--modal-scale:1] [--modal-opacity:1]'
			},
			false:
				'[--modal-scale:1] sm:[--modal-scale:0.95] [--modal-y:5rem] sm:[--modal-y:0px] max-w-lg w-full'
		},
		side: {
			left: {
				base: 'left-0 top-0 h-full [--modal-x:-100%]',
				container: 'justify-start'
			},
			right: {
				base: 'right-0 top-0 h-full [--modal-x:100%]',
				container: 'justify-end'
			},
			top: {
				base: 'top-0 left-0 w-full [--modal-y:-100%]',
				container: 'items-start sm:items-start'
			},
			bottom: {
				base: 'bottom-0 left-0 w-full sm:[--modal-y:100%]',
				container: 'sm:items-end'
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
			drawer: boolean;
			side: 'left' | 'right' | 'top' | 'bottom';
		}
	>('dialog');

export type ModalTrigger = Writable<Record<string, any> & { action: Action<any, any> }>;
