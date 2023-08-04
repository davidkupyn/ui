import {
	createRadioGroup,
	type CreateRadioGroupProps,
	type RadioGroup as RadioGroupReturn
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import Root from './radio-group-root.svelte';
import Radio from './radio-item.svelte';

const NAME = 'radio-group';

export const ctx = {
	set: (props: CreateRadioGroupProps) => {
		const radioGroup = createRadioGroup(props);
		setContext(NAME, radioGroup);
		return radioGroup;
	},
	get: () => getContext<RadioGroupReturn>(NAME)
};

export const RadioGroup = Object.assign(Root, {
	Radio
});
