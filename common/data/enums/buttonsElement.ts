export const buttonClassNames: Record<ButtonType, string> = {
	primary:
		'border border-[--website-primary] bg-[--website-primary] text-[--website-primary-text] shadow-lg shadow-[--website-primary-text] shadow-opacity-30 hover:bg-[--website-primary-hover-bg] hover:text-[--website-primary-hover]',
	secondary:
		'border border-[--website-secondary] bg-[--website-secondary] text-[--website-secondary-text] shadow-lg shadow-[--website-secondary-text] shadow-opacity-30 hover:bg-[--website-secondary-hover-bg] hover:text-[--website-secondary-hover]',
	success:
		'border border-[--website-success] bg-[--website-success] text-[--website-success-text] shadow-lg shadow-[--website-success-text] shadow-opacity-30 hover:bg-[--website-success-hover-bg] hover:text-[--website-success-hover]',
	error: 'border border-[--website-error] bg-[--website-error] text-[--website-error-text] shadow-lg shadow-[--website-error-text] shadow-opacity-30 hover:bg-[--website-error-hover-bg] hover:text-[--website-error-hover]',
	warning:
		'border border-[--website-warning] bg-[--website-warning] text-[--website-warning-text] shadow-lg shadow-[--website-warning-text] shadow-opacity-30 hover:bg-[--website-warning-hover-bg] hover:text-[--website-warning-hover]',

	ghost: 'border border-transparent bg-transparent',
};
export const buttonIcons: Record<ButtonIconType, string> = {
	'arrow-left': 'icon-[solar--alt-arrow-left-linear]',
	'arrow-right': 'icon-[solar--alt-arrow-right-linear]',
	play: 'icon-[solar--play-bold]',
	'eye-closed': 'icon-[solar--eye-closed-bold]',
	cart: 'icon-[solar--cart-large-2-bold]',
	heart: 'icon-[solar--heart-bold]',
	search: 'icon-[solar--magnifer-bold]',
	check: 'icon-[solar--check-circle-bold]',
	close: 'icon-[solar--close-circle-bold]',
	edit: 'icon-[solar--pen-new-round-bold]',
	menu: 'icon-[solar--hamburger-menu-bold]',
	eye: 'icon-[solar--eye-bold]',
	plus: 'icon-[solar--add-circle-bold]',
	minus: 'icon-[solar--minus-circle-bold]',
	trash: 'icon-[solar--trash-bin-minimalistic-bold]',
	user: 'icon-[solar--user-bold]',
};
