import type { createPopover } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as Popover } from './popover-root.svelte';

export const getPopoverContext = () => getContext<ReturnType<typeof createPopover>>('popover');
