/* eslint-disable @typescript-eslint/no-explicit-any */
import { uuid } from './uuid';
import { onMount } from 'svelte';
import { get, writable } from 'svelte/store';

type StoredListener<Callback extends (...args: any) => void> = {
	callback: Callback;
	id: string;
};

export const createDispatcher = <Callback extends (...args: any) => void>() => {
	const store = writable<StoredListener<Callback>[]>([]);

	const addListener = (callback: Callback) => {
		const id = uuid();
		store.update((listeners) => [...listeners, { callback, id }]);

		return id;
	};

	const removeListener = (idToRemove: string) => {
		store.update((listeners) => listeners.filter(({ id }) => id !== idToRemove));
	};

	const dispatch = (...params: Parameters<Callback>) => {
		get(store).forEach(({ callback: c }) => {
			c(...(params as any));
		});
	};

	const addListenerOnMount = (callback: Callback) => {
		onMount(() => {
			const id = addListener(callback);
			return () => removeListener(id);
		});
	};

	return { ...store, addListener, removeListener, dispatch, addListenerOnMount };
};
