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
import { writable, type Writable } from 'svelte/store';

const NAME = 'accordion';
const ITEM_NAME = 'accordion-item';

export const ctx = {
	set: (props: CreateAccordionProps<boolean>) => {
		const accordion = createAccordion(props);
		setContext(NAME, accordion);
		return accordion;
	},
	get: () => getContext<AccordionReturn>(NAME),
	item: {
		set: (props: { value: string; disabled: boolean }) => {
			setContext(ITEM_NAME, writable(props));
		},
		get: () => getContext<Writable<{ value: string; disabled: boolean }>>(ITEM_NAME)
	}
};

export const Accordion = Object.assign(Root, {
	Item,
	Trigger,
	Content
});
