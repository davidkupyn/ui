import type { StoreValue } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

type Options = Record<string, Writable<unknown>>;
export function getOptionUpdater(options: Options) {
	return function <
		K extends keyof typeof options,
		V extends StoreValue<(typeof options)[keyof typeof options]>
	>(key: K, value: V | undefined) {
		if (value === undefined) return;
		const store = options[key];
		store.set(value as never);
	};
}

export function createNamedContext<Ctx>(name: string) {
	return {
		set: (props: Ctx) => setContext(name, props),
		get: () => getContext<Ctx>(name)
	};
}
