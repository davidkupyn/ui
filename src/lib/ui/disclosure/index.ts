import { createCollapsible, type Collapsible, type CreateCollapsibleProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import Root from './disclosure-root.svelte';
import Trigger from './disclosure-trigger.svelte';
import Content from './disclosure-content.svelte';

const NAME = 'disclosure';

type AdditionalProps = {
	unstyled?: boolean;
};

export const ctx = {
	set: (props: CreateCollapsibleProps & AdditionalProps) => {
		const disclosure = createCollapsible(props);
		setContext(NAME, disclosure);
		return disclosure;
	},
	get: () => getContext<Collapsible & AdditionalProps>(NAME)
};

export const Disclosure = Object.assign(Root, {
	Trigger,
	Content
});
