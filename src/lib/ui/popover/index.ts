import {
	createPopover,
	type Popover as PopoverReturn,
	type CreatePopoverProps
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import Root from './popover-root.svelte';
import Content from './popover-content.svelte';

const NAME = 'popover';

export const ctx = {
	set: (props: CreatePopoverProps) => {
		const popover = createPopover(props);
		setContext(NAME, popover);
		return popover;
	},
	get: () => getContext<PopoverReturn>(NAME)
};

export const Popover = Object.assign(Root, {
	Content
});
