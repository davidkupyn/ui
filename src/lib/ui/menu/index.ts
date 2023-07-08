import type { createDropdownMenu } from '@melt-ui/svelte'
import { getContext } from 'svelte'

export { default as Menu } from './root.svelte'

export const getMenuContext = () => getContext<
  ReturnType<typeof createDropdownMenu>>('dropdown')

type CreateSubMenuReturnType = ReturnType<ReturnType<typeof createDropdownMenu>['createSubMenu']>;
export const getSubMenuContext = () => getContext<
CreateSubMenuReturnType
  >('sub-dropdown')

type CreateRadioGroupReturnType = ReturnType<ReturnType<typeof createDropdownMenu>['createMenuRadioGroup']>;
export const getRadioGroupContext = () => getContext<
CreateRadioGroupReturnType
  >('radio-group')
