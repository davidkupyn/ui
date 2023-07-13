import type { createCollapsible } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as Disclosure } from './disclosure-root.svelte';

export const getDisclosureContext = () =>
	getContext<
		ReturnType<typeof createCollapsible> & {
			unstyled: boolean;
		}
	>('disclosure');
