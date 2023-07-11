import type { createHoverCard } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as HoverCard } from './hover-card-root.svelte';

export const getHoverCardContext = () =>
	getContext<ReturnType<typeof createHoverCard>>('hover-card');
