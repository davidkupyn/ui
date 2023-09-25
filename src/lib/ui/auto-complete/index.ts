import {
	createCombobox,
	type CreateComboboxProps,
	type Combobox as ComboboxReturn
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
export { default as AutoComplete } from './auto-complete-root.svelte';
const NAME = 'auto-complete';

export const ctx = {
	set: <T>(props: CreateComboboxProps<T>) => {
		const autoComplete = createCombobox(props);

		setContext(NAME, autoComplete);
		return autoComplete;
	},
	get: () => getContext<ComboboxReturn>(NAME)
};
