import type { ComponentType } from 'svelte';
import { toast as toastPrimivite } from 'svelte-sonner';
import Custom from './custom.svelte';

type ToastTypes = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading';
export type PromiseType<Data = unknown> = Promise<Data> | (() => Promise<Data>);

export type ToastData = {
	icon?: ComponentType;
	component?: ComponentType;
	invert?: boolean;
	description?: string | ComponentType;
	duration?: number;
	delete?: boolean;
	important?: boolean;
	action?: {
		label: string;
		onClick: (event: MouseEvent) => void;
	};
	cancel?: {
		label: string;
		onClick?: () => void;
	};
	onDismiss?: (toast: ToastData) => void;
	onAutoClose?: (toast: ToastData) => void;
	promise?: PromiseType;
	style?: string;
	class?: string;
	descriptionClass?: string;
};

function basic(message: string | ComponentType, data: ToastData) {
	toastPrimivite.custom(Custom, data);
}

function success(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

function info(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

function warning(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

function error(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

function promise(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

function dismiss(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

function loading(message: string | ComponentType, data: ToastData) {
	toastPrimivite(message, data);
}

export const toast = Object.assign(basic, {
	success,
	info,
	warning,
	error,
	promise,
	dismiss,
	loading
});
