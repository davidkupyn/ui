import { tv } from 'tailwind-variants';

export { default as Alert } from './alert-root.svelte';

export const alertStyles = tv({
	base: 'relative w-full rounded-2xl ring-1 ring-foreground/5 shadow px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
	variants: {
		variant: {
			default: 'bg-background text-foreground',
			error: 'border-error/50 text-error [&>svg]:text-error',
			success: 'border-success/50 text-success [&>svg]:text-success',
			warning: 'border-warning/50 text-warning [&>svg]:text-warning',
			info: 'border-info/50 text-info [&>svg]:text-info',
			accent: 'border-accent/50 text-accent [&>svg]:text-accent'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});
