import type { createAccordion } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as Accordion } from './accordion-root.svelte';

export const getAccordionContext = () =>
	getContext<ReturnType<typeof createAccordion>>('accordion');

export const getAccordionItemContext = () =>
	getContext<{
		value: string;
		disabled: boolean;
	}>('accordion-item');

export const generateAccordionOptions = (
	multiple: boolean,
	value: string | string[] | undefined
) => {
	if (multiple && Array.isArray(value)) {
		return {
			type: 'multiple' as const,
			value: value as string[]
		};
	} else {
		return {
			type: 'single' as const,
			value: value as string
		};
	}
};
