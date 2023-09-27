export { default as Menu } from './menu-root.svelte';

import {
	createContextMenu,
	createDropdownMenu,
	type CreateDropdownMenuProps,
	type CreateMenuRadioGroupProps,
	type DropdownMenu
} from '@melt-ui/svelte';
import type { _CheckboxItemProps, _CreateSubmenuProps } from '@melt-ui/svelte/dist/builders/menu';
import { getContext, setContext } from 'svelte';
import { tv } from 'tailwind-variants';

const NAME = 'menu';
const SUBMENU_NAME = 'submenu';
const RADIO_GROUP_NAME = 'radio-group';
export const menuStyles = tv({
	slots: {
		content:
			'rounded-xl p-1 border border-popover-border bg-popover min-w-[8rem] shadow-lg z-50 focus:outline-none',
		item: 'active:scale-95 transition-transform flex cursor-default gap-2 select-none text-muted-foreground items-center rounded-lg disabled:opacity-50 disabled:pointer-events-none px-4 py-1.5 h-9 outline-none focus:bg-muted focus:text-foreground data-[highlighted]:bg-muted data-[highlighted]:text-foreground aria-selected:text-foreground sm:text-sm',
		itemLabel: 'input-label py-2 pl-5 pr-5 font-semibold text-foreground',
		separator: '-mx-1 my-1 h-px bg-popover-border'
	}
});

function set(props: CreateDropdownMenuProps, type: 'context-menu' | 'dropdown-menu') {
	const menu = type === 'dropdown-menu' ? createDropdownMenu(props) : createContextMenu(props);
	setContext(NAME, menu);
	return menu;
}

function get() {
	return getContext<DropdownMenu>(NAME);
}
export const ctx = {
	set,
	get,
	getItem: (itemProps?: { type: 'checkbox'; options: _CheckboxItemProps } | { type: 'item' }) => {
		let type, options;
		if (itemProps && itemProps.type === 'checkbox') {
			type = itemProps.type;
			options = itemProps.options;
		} else {
			type = 'item';
		}

		const {
			elements: { item },
			builders: { createCheckboxItem }
		} = get();
		return type === 'checkbox'
			? {
					type: 'checkbox' as const,
					checkbox: createCheckboxItem(options)
			  }
			: {
					type: 'item' as const,
					item
			  };
	},
	submenu: {
		set: (props: _CreateSubmenuProps) => {
			const {
				builders: { createSubmenu }
			} = get();
			const submenu = createSubmenu(props);
			setContext(SUBMENU_NAME, submenu);
			return submenu;
		},
		get: () => getContext<ReturnType<typeof ctx.submenu.set>>(SUBMENU_NAME)
	},
	radioGroup: {
		set: (props: CreateMenuRadioGroupProps) => {
			const {
				builders: { createMenuRadioGroup }
			} = get();
			const radioGroup = createMenuRadioGroup(props);
			setContext(RADIO_GROUP_NAME, radioGroup);
			return radioGroup;
		},
		get: () => getContext<ReturnType<typeof ctx.radioGroup.set>>(RADIO_GROUP_NAME)
	}
};
