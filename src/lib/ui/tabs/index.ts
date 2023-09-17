export { default as Tabs } from './tabs-root.svelte';
import { createTabs, type CreateTabsProps, type Tabs } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = 'tabs';

export const ctx = {
	set: (props: CreateTabsProps) => {
		const tabs = createTabs(props);
		setContext(NAME, tabs);
		return tabs;
	},
	get: () => getContext<Tabs>(NAME)
};
