import Button from '#client/Buttons/Button';
import { Link } from '@client/i18n/routing';
import { buttonClassNames, buttonIcons } from '@common/data/enums/buttonsElement';
import { cn } from '@common/utils/frontend/utils';
import React from 'react';
const iconButtonClassName = 'flex rounded-full p-1 sm:p-2';
const iconClassName = 'h-4 w-4 md:h-5 md:w-5';
export default function ButtonElement({ button, locale }: { button: ButtonI; locale: LanguagesI }) {
	if (button.type === 'ghost')
		return (
			<Link href={button.link} className="flex items-center justify-center gap-2">
				{button.icon?.left && (
					<span className={cn(buttonClassNames.primary, iconButtonClassName)}>
						<span className={cn(buttonIcons[button.icon.left], iconClassName)} />
					</span>
				)}
				{button.text[locale]}
				{button.icon?.right && (
					<span className={cn(buttonClassNames.primary, iconButtonClassName)}>
						<span className={cn(buttonIcons[button.icon.right], iconClassName)} />
					</span>
				)}
			</Link>
		);
	return (
		<Button className={buttonClassNames[button.type]} href={button.link}>
			{button.icon?.left && <span className={cn(buttonIcons[button.icon.left], iconClassName)} />}
			{button.text[locale]}
			{button.icon?.right && <span className={cn(buttonIcons[button.icon.right], iconClassName)} />}
		</Button>
	);
}
