export { default as HoverCard } from './hover-card-root.svelte';

import { createHoverCard, type CreateHoverCardProps, type HoverCard } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = 'hover-card';

export const ctx = {
	set: (props: CreateHoverCardProps) => {
		const hoverCard = createHoverCard(props);
		setContext(NAME, hoverCard);
		return hoverCard;
	},
	get: () => getContext<HoverCard>(NAME)
};
