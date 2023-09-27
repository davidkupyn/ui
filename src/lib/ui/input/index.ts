export { default as Input } from './input-root.svelte';
import { tv } from 'tailwind-variants';

export const inputStyles = tv({
	base: 'h-9 rounded-lg border-0 w-full bg-background px-4 text-base text-foreground shadow outline-none ring-1 ring-foreground/10 transition duration-200 placeholder:text-muted-foreground invalid:ring-error hover:ring-accent invalid:hover:ring-error focus:ring-accent invalid:focus:ring-error disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:ring-error data-[invalid]:hover:ring-error data-[invalid]:focus:ring-error dark:bg-muted sm:text-sm'
});
