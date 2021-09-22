import React from 'react';
import Icons from '../../atoms/Icons';
import Button from '../../atoms/Button/index';

export default function LinkMenu({
	title,
	href,
	liClass,
	aClass,
	icon,
	sizeIc,
	colorIcon,
}) {
	return (
		<>
			<li className={liClass}>
				<Button
					listClass={aClass}
					aria-current="page"
					type="link"
					linkHref={href}
				>
					{icon && <Icons icon={icon} color={colorIcon} size={sizeIc || 15} />}{' '}
					{title}
				</Button>
			</li>
		</>
	);
}
