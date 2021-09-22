import React from 'react';
import Button from '../Button/index';
import { useLocation } from 'react-router-dom';
export default function BreadCrummb({ data }) {
	const location = useLocation();
	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					{data.map((item, index) => {
						return (
							<li
								key={`breadcrumb-${index}`}
								className={`breadcrumb-item ${
									location.pathname === item.pageHref ? 'active' : ''
								}`}
							>
								{location.pathname === item.pageHref ? (
									item.pageTitle
								) : (
									<Button type="link" linkHref={item.pageHref}>
										{item.pageTitle}
									</Button>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		</>
	);
}
