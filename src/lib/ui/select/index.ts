import { type CreateSelectProps, createSelect } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import Root from './select-root.svelte';
import Option from './select-option.svelte';
import OptionGroup from './select-option-group.svelte';
import OptionGroupLabel from './select-option-group-label.svelte';

const NAME = 'select';

export const ctx = {
	set: (props: CreateSelectProps) => {
		const select = createSelect(props);
		setContext(NAME, select);
		return select;
	},
	get: () => getContext<CreateSelectProps>(NAME)
};

export const Select = Object.assign(Root, {
	Option,
	OptionGroup,
	OptionGroupLabel
});
