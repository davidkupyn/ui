export { default as Avatar } from './avatar-root.svelte';

import { type Avatar, createAvatar, type CreateAvatarProps } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';

const NAME = 'avatar';

export const ctx = {
	set: (props: CreateAvatarProps) => {
		const avatar = createAvatar(props);
		setContext(NAME, avatar);
		return avatar;
	},
	get: () => getContext<Avatar>(NAME)
};
