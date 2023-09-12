import { type Writable, writable } from 'svelte/store';

/**
 * Given an object of properties, returns an object of writable stores
 * with the same properties and values.
 */
export function toWritableStores<T extends Record<string, unknown>>(
	properties: T
): { [K in keyof T]: Writable<T[K]> } {
	const result = {} as { [K in keyof T]: Writable<T[K]> };

	for (const key in properties) {
		result[key] = writable(properties[key]);
	}

	return result;
}

export type ToWritableProps<T extends Record<string, unknown>> = {
	[K in keyof T]: Writable<T[K]>;
};
