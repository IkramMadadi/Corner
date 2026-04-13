declare type ButtonType = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'ghost';
declare type ButtonIconType =
	| 'arrow-left'
	| 'arrow-right'
	| 'play'
	| 'cart'
	| 'heart'
	| 'search'
	| 'user'
	| 'close'
	| 'menu'
	| 'plus'
	| 'minus'
	| 'check'
	| 'edit'
	| 'trash'
	| 'eye'
	| 'eye-closed';
declare interface ButtonI {
	link: string;
	type: ButtonType;
	icon?: {
		left?: ButtonIconType;
		right?: ButtonIconType;
	};
	text: LanguagesContentI;
}
declare interface PublicButtonI extends ButtonI {
	_id: string;
}
