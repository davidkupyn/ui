import type { createSelect } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as Select } from './select-root.svelte';

export const getSelectContext = () => getContext<ReturnType<typeof createSelect>>('select');
