import type { createCombobox } from '@melt-ui/svelte';
import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export { default as AutoComplete } from './root.svelte';

export const getAutoCompleteContext = () =>
	getContext<
		ReturnType<typeof createCombobox> & {
			items: Writable<
				{
					value: string;
					label: string;
				}[]
			>;
		}
	>('auto-complete');
