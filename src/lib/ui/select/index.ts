import { createSelect, type CreateSelectProps, type Select as SelectReturn } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
export { default as Select } from './select-root.svelte';

const NAME = 'select';
const GROUP_NAME = NAME + '-option-group';

export const ctx = {
	set: (props: CreateSelectProps) => {
		const select = createSelect(props);
		setContext(NAME, select);
		return select;
	},
	get: () => getContext<SelectReturn>(NAME),
	group: {
		get: () => getContext<string>(GROUP_NAME),
		set: (key: string) => {
			setContext(GROUP_NAME, key);
		}
	}
};
