import {
	createCombobox,
	type CreateComboboxProps,
	type Combobox as ComboboxReturn
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
export { default as CommandMenu } from './command-menu-root.svelte';
const NAME = 'command-menu';

export const ctx = {
	set: <T>(props: CreateComboboxProps<T>) => {
		const commandMenu = createCombobox(props);
		setContext(NAME, commandMenu);
		return commandMenu;
	},
	get: () => getContext<ComboboxReturn>(NAME)
};
