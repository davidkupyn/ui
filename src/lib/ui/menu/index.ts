import type { createDropdownMenu } from '@melt-ui/svelte';
import { getContext } from 'svelte';
import { tv } from 'tailwind-variants';

export { default as Menu } from './menu-root.svelte';

export const menuStyles = tv({
	slots: {
		content:
			'rounded-2xl p-1 border border-popover-border bg-popover min-w-[8rem] shadow-lg z-50 focus:outline-none',
		item: 'active:scale-95 transition-transform flex cursor-default gap-2 select-none text-muted-foreground items-center rounded-xl disabled:opacity-50 disabled:pointer-events-none px-4 py-1.5 h-9 outline-none focus:bg-muted focus:text-foreground sm:text-sm',
		itemLabel: 'input-label py-2 pl-5 pr-5 font-semibold text-foreground',
		separator: '-mx-1 my-1 h-px bg-popover-border'
	}
});

export const getMenuContext = () => getContext<ReturnType<typeof createDropdownMenu>>('dropdown');

type CreateSubMenuReturnType = ReturnType<ReturnType<typeof createDropdownMenu>['createSubMenu']>;
export const getSubMenuContext = () => getContext<CreateSubMenuReturnType>('sub-dropdown');

type CreateRadioGroupReturnType = ReturnType<
	ReturnType<typeof createDropdownMenu>['createMenuRadioGroup']
>;
export const getRadioGroupContext = () => getContext<CreateRadioGroupReturnType>('radio-group');
