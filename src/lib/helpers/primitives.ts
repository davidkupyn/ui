// import type { StoreValue } from '@melt-ui/svelte';
// import { getContext, setContext } from 'svelte';
// import type { Writable } from 'svelte/store';

import { getContext, setContext } from "svelte";
import { writable, type StoresValues, type Writable } from "svelte/store";
import { uuid } from "./uuid";


type Options = Record<string, Writable<unknown>>;

export function getOptionUpdater(options: Options) {
	return function <
		K extends keyof typeof options,
		V extends StoresValues<(typeof options)[keyof typeof options]>
	>(key: K, value: V | undefined) {
		if (value === undefined) return;
		const store = options[key];
		store.set(value as never);
	};
}

export function createEssenceContext<Props extends {}, ExtraProps extends {}>({
	props,
	extraProps,
	builder = (props: Props) => props
}: {
	props: Props;
	extraProps?: ExtraProps;
	builder?: (props: Props) => {};
}) {
	const NAME = uuid();
	const ctx = {
		set: ({
			props,
			extraProps,
		}: {
			props: Props;
			extraProps?: ExtraProps;
		}) => {
			const component: ReturnType<typeof builder> = builder(props);
			const extraOptions = writable(extraProps);
			const combined = {
				...component,
				extraOptions
			};
			setContext(NAME, component);
			return combined;
		},
		get: () => getContext<Props & ExtraProps>(NAME)
	};

	ctx.set({ props, extraProps });
	return ctx
}


export function createReactiveObject<Props extends {}>(initialValue?: Props) {
	const stores = {} as Record<keyof Props, Writable<Props[keyof Props]>>;
	for (const key in initialValue) {
		stores[key] = writable(initialValue[key]);
	}
	return stores;
}