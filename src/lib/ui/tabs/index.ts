export { default as Tabs } from './tabs-root.svelte';
import { createTabs, type CreateTabsProps, type Tabs } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import type { crossfade } from 'svelte/transition';

const NAME = 'tabs';

type Crossfade = ReturnType<typeof crossfade>;

export const ctx = {
	set: (props: CreateTabsProps) => {
		const tabs = createTabs(props);
		setContext(NAME, tabs);
		return tabs;
	},
	get: () => getContext<Tabs>(NAME),
	crossfade: {
		set: (crossfade: Crossfade) => setContext<Crossfade>(`${NAME}-crossfade`, crossfade),
		get: () => getContext<Crossfade>(`${NAME}-crossfade`)
	}
};
