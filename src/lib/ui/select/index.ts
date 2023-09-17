import { createSelect, type CreateSelectProps, type Select as SelectReturn } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import OptionGroupLabel from './select-option-group-label.svelte';
import OptionGroup from './select-option-group.svelte';
import Option from './select-option.svelte';
import Root from './select-root.svelte';

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

export const Select = Object.assign(Root, {
	Option,
	OptionGroup,
	OptionGroupLabel
});
