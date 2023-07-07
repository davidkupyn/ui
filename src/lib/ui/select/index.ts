import type { createSelect } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as Select } from './root.svelte'
export { default as Option } from './option.svelte'

export const getSelectContext = () => getContext<
  ReturnType<typeof createSelect>>('select')