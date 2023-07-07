import type { createAvatar } from '@melt-ui/svelte'
import { getContext } from 'svelte'
import { tv } from 'tailwind-variants'

export { default as Avatar } from './root.svelte'

export const avatar = tv(
  {
    slots: {
      root: 'grid w-9 aspect-square place-content-center rounded-full bg-muted',
      fallback: 'font-medium',
    }
  }
)

export const getAvatarContext = () => getContext<
  Pick<ReturnType<typeof createAvatar>, 'fallback'> & {
    defaultClass: string
  }
>('avatar')
  