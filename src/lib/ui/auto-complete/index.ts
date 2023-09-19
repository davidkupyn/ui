import { toWritableStores, type ToWritableProps } from '$lib/helpers';
import {
	createCombobox,
	type CreateComboboxProps,
	type Combobox as ComboboxReturn
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
export { default as AutoComplete } from './auto-complete-root.svelte';
const NAME = 'auto-complete';

type ExtraComboboxProps = {
	items: string[];
};

export const ctx = {
	set: <T>(props: CreateComboboxProps<T> & { props: ExtraComboboxProps }) => {
		const autoComplete = createCombobox(props);
		const extraOptions = toWritableStores(props.props);
		const combined = {
			...autoComplete,
			options: {
				...autoComplete.options,
				...extraOptions
			}
		};
		setContext(NAME, combined);
		return combined;
	},
	get: () =>
		getContext<
			ComboboxReturn & {
				options: ToWritableProps<ExtraComboboxProps>;
			}
		>(NAME)
};
