import { toWritableStores, type ToWritableProps } from '$lib/helpers';
import { createDialog, type Dialog, type CreateDialogProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { tv } from 'tailwind-variants';

const NAME = 'modal';

export { default as Modal } from './modal-root.svelte';

export const modal = tv({
	slots: {
		base: 'relative z-50 flex flex-col shadow-lg focus:outline-none rounded-2xl border border-popover-border bg-popover p-5 gap-5 rounded-t-2xl [--modal-duration:300] sm:[--modal-duration:200] ',
		container: 'z-50 flex justify-center sm:items-center items-end fixed inset-0 p-2',
		title: 'font-semibold text-lg leading-none tracking-tight flex items-center',
		description: 'text-sm text-muted-foreground'
	},
	variants: {
		hasIcon: {
			true: {
				title: 'gap-2.5'
			}
		},
		drawer: {
			true: {
				base: '[--modal-scale:1]'
			},
			false:
				'[--modal-scale:1] sm:[--modal-scale:0.95] [--modal-y:10rem] sm:[--modal-y:0px] max-w-lg w-full'
		},
		side: {
			left: {
				base: 'h-full [--modal-x:-100%]',
				container: 'justify-start'
			},
			right: {
				base: 'h-full [--modal-x:100%]',
				container: 'justify-end'
			},
			top: {
				base: 'w-full [--modal-y:-100%]',
				container: 'items-start sm:items-start'
			},
			bottom: {
				base: 'w-full [--modal-y:100%]',
				container: 'sm:items-end'
			}
		}
	}
});

type ExtraDialogProps = {
	alert?: boolean;
	type?: 'info' | 'success' | 'warning' | 'error';
	drawer?: boolean;
	side?: 'left' | 'right' | 'top' | 'bottom';
	crossButton?: boolean;
};

export const ctx = {
	set: (
		props: CreateDialogProps & {
			props: ExtraDialogProps;
		}
	) => {
		const dialog = createDialog(props);
		const extraOptions = toWritableStores(props.props);
		const combined = {
			...dialog,
			options: {
				...dialog.options,
				...extraOptions
			}
		};
		setContext(NAME, combined);
		return combined;
	},
	get: () =>
		getContext<
			Dialog & {
				options: ToWritableProps<ExtraDialogProps>;
			}
		>(NAME)
};

function split_css_unit(value: number | string): [number, string] {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [value as number, 'px'];
}

export function css(
	node: Element,
	{
		delay = 0,
		enabled = true,
		duration = 400,
		easing = cubicOut,
		x = 0,
		y = 0,
		opacity = 0,
		scale = 1
	}: {
		delay?: number;
		enabled?: string | boolean | (() => boolean);
		duration?: number | string;
		easing?: (t: number) => number;
		x?: number | string;
		y?: number | string;
		opacity?: number | string;
		scale?: number | string;
	} = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const isOpacityVar = typeof opacity === 'string' && opacity.startsWith('--');

	let isEnabled: boolean;

	if (typeof enabled === 'string' && enabled.startsWith('--')) {
		isEnabled = style.getPropertyValue(enabled) === 'true';
	} else if (typeof enabled !== 'string') {
		isEnabled = typeof enabled === 'boolean' ? enabled : enabled();
	}
	const [start_opacity] = split_css_unit(isOpacityVar ? style.getPropertyValue(opacity) : opacity);
	const od = target_opacity * (1 - start_opacity);
	const sd = typeof scale === 'string' ? 1 - Number(style.getPropertyValue(scale)) : 1 - scale;
	const isXVar = typeof x === 'string' && x.startsWith('--');
	const isYVar = typeof y === 'string' && y.startsWith('--');
	const [xValue, xUnit] = split_css_unit(isXVar ? style.getPropertyValue(x) : x);
	const [yValue, yUnit] = split_css_unit(isYVar ? style.getPropertyValue(y) : y);
	duration = typeof duration === 'string' ? parseFloat(style.getPropertyValue(duration)) : duration;

	return {
		delay,
		duration,
		easing,
		css: (t, u) =>
			isEnabled
				? `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit}) scale(${
						1 - sd * u
				  });
			opacity: ${target_opacity - od * u}`
				: ''
	};
}
