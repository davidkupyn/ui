import type { createDialog } from '@melt-ui/svelte'
import { getContext } from 'svelte'
import { tv } from 'tailwind-variants'

export { default as Dialog } from './root.svelte'

export const dialog = tv(
  {
    slots: {
      base: 'fixed z-50 grid w-full sm:max-w-lg shadow-lg focus:outline-none sm:rounded-3xl sm:border border-popover-border bg-popover backdrop-blur-md p-6',
      title: 'font-semibold mb-2 text-md sm:text-lg flex items-center',
      description: 'mb-4 text-sm text-muted-foreground',
    },
    variants: {
      alert: {
        true: {
          base: 'max-sm:pb-12 rounded-t-3xl border-t'
        },
        false: {
          base: 'rounded-b-3xl border-b'
        }
      },
      hasIcon: {
        true: {
          title: 'gap-2',
        }
      }
    }
  }
)

export const getDialogContext = () => getContext<
  ReturnType<typeof createDialog> & {
    alert: boolean
    type: 'info' | 'success' | 'warning' | 'error'
    crossButton: boolean
  }
>('dialog')