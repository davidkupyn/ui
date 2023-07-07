import type { createAccordion } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as Accordion } from './root.svelte'

export const getAccordionContext = () => getContext<
  ReturnType<typeof createAccordion>>('accordion')

export const getAccordionItemContext = () => getContext<{
  value: string
  disabled: boolean
}>('accordion-item')