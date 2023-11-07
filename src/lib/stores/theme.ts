import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { setMode, resetMode } from 'mode-watcher';

type Theme = 'dark' | 'light' | 'system';

export const currentTheme = writable<Theme>('system');

currentTheme.subscribe((theme) => {
	if (browser) {
		if (theme === 'system') {
			resetMode();
		} else {
			setMode(theme);
		}
	}
});
