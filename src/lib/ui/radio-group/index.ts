import type { createRadioGroup } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as RadioGroup } from './radio-group-root.svelte';

export const getRadioGroupContext = () =>
	getContext<ReturnType<typeof createRadioGroup>>('radio-group');
