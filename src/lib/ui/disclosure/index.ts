import type { createCollapsible } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as Disclosure } from './root.svelte'

export const getDisclosureContext = () => getContext<
  ReturnType<typeof createCollapsible>>('disclosure')