import {
	createAccordion,
	type Accordion as AccordionReturn,
	type CreateAccordionProps
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import Root from './accordion-root.svelte';
import Item from './accordion-item.svelte';
import Trigger from './accordion-item-trigger.svelte';
import Content from './accordion-item-content.svelte';

// export const generateAccordionOptions = (
// 	multiple: boolean,
// 	value: string | string[] | undefined
// ): CreateAccordionProps => {
// 	if (multiple && Array.isArray(value)) {
// 		return {
// 			type: 'multiple' as const,
// 			value: value as string[]
// 		};
// 	} else {
// 		return {
// 			type: 'single' as const,
// 			value: value as string
// 		};
// 	}
// };

const NAME = 'accordion';
const ITEM_NAME = 'accordion-item';
export const ctx = {
	set: (props: CreateAccordionProps) => {
		const accordion = createAccordion(props);
		setContext(NAME, accordion);
		return accordion;
	},
	get: () => getContext<AccordionReturn>(NAME),
	item: {
		set: (props: { value: string; disabled: boolean }) => {
			setContext(ITEM_NAME, props);
		},
		get: () => getContext<{ value: string; disabled: boolean }>(ITEM_NAME)
	}
};

export const Accordion = Object.assign(Root, {
	Item,
	Trigger,
	Content
});
