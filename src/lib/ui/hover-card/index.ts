import type { createHoverCard } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as HoverCard } from './root.svelte'

export const getHoverCardContext = () => getContext<
  ReturnType<typeof createHoverCard>>('hover-card')
