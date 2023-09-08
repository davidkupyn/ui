export { default as HoverCard } from './link-preview-root.svelte';

import { createLinkPreview, type CreateLinkPreviewProps, type LinkPreview } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = 'link-preview';

export const ctx = {
	set: (props: CreateLinkPreviewProps) => {
		const hoverCard = createLinkPreview(props);
		setContext(NAME, hoverCard);
		return hoverCard;
	},
	get: () => getContext<LinkPreview>(NAME)
};
