import type { createTabs } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as Tabs } from './root.svelte'

export const getTabsContext = () => getContext<
  ReturnType<typeof createTabs>>('tabs')