export { default as Disclosure } from './disclosure-root.svelte';

import { createCollapsible, type Collapsible, type CreateCollapsibleProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

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
