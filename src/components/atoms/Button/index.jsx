import React from 'react';
import { Link } from 'react-router-dom';
export default function index({
	listClass,
	isPrimary,
	isLarge,
	isSmall,
	isBlock,
	hasShadow,
	getFunc,
	listStyle,
	isLoading,
	isDisabled,
	children,
	type,
	isExternal,
	linkHref,
	target,
}) {
	const className = [listClass];
	if (isPrimary) className.push('btn-primary');
	if (isLarge) className.push('btn-lg');
	if (isSmall) className.push('btn-sm');
	if (isBlock) className.push('btn-block');
	if (hasShadow) className.push('btn-shadow');
	const onClick = () => {
		if (getFunc) getFunc();
	};
	if (isDisabled || isLoading) {
		if (isDisabled) className.push('disabled');
		return (
			<span className={className.join(' ')} style={listStyle}>
				{isLoading ? (
					<>
						{' '}
						<span className="spinner-border spinner-border-sm mx-5"></span>{' '}
						<span className="sr-only">Loading...</span>{' '}
					</>
				) : (
					children
				)}
			</span>
		);
	}
	if (type === 'link') {
		if (isExternal) {
			return (
				<a
					href={linkHref}
					className={className.join(' ')}
					style={listStyle}
					target={target === '_blank' ? '_blank' : undefined}
					rel={target === '_blank' ? 'noopener noreferrer' : undefined}
				>
					{children}
				</a>
			);
		} else {
			return (
				<Link
					to={linkHref}
					className={className.join(' ')}
					style={listStyle}
					onClick={onClick}
				>
					{children}
				</Link>
			);
		}
	}
	return (
		<button className={className.join(' ')} style={listStyle} onClick={onClick}>
			{children}
		</button>
	);
}
