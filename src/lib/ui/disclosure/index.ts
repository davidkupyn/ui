import Root from './disclosure-root.svelte';
import Trigger from './disclosure-trigger.svelte';
import Content from './disclosure-content.svelte';
import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { createCollapsible, type Collapsible, type CreateCollapsibleProps } from '@melt-ui/svelte';
import { toWritableStores } from '$lib/helpers';

const NAME = 'disclosure';

export const ctx = {
	set: (props: CreateCollapsibleProps & {
		props: {
			unstyled?: boolean;
		}
	}) => {
		const disclosure = createCollapsible(props);
		const extraOptions = toWritableStores(props.props)
		const combined = {
			...disclosure,
			extraOptions,
			options: {
				...disclosure.options,
				...extraOptions
			} 
		};
		setContext(NAME, combined);
		return combined;
	},
	get: () => getContext<Collapsible & {
		extraOptions: {
			unstyled: Writable<boolean>;
		}
	}>(NAME)
};

export const Disclosure = Object.assign(Root, {
	Trigger,
	Content
});
