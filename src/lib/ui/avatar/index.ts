import type { createAvatar } from '@melt-ui/svelte';
import { getContext } from 'svelte';

export { default as Avatar } from './avatar-root.svelte';

export const getAvatarContext = () =>
	getContext<Pick<ReturnType<typeof createAvatar>, 'fallback'>>('avatar');
