import type { createCombobox } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as Select } from './root.svelte'
export { default as Option } from './item.svelte'

export const getAutoCompleteContext = () => getContext<
  ReturnType<typeof createCombobox>>('auto-complete')