import React, { useState } from 'react';

export default function Menu({ title, href, childs }) {
	const [open, setOPen] = useState(false);

	const openChild = () => {
		setOPen(!open);
	};
	return (
		<>
			<li className="menu-item-has-children dropdown">
				<div
					onClick={openChild}
					className="dropdown-toggle"
					dataToggle="dropdown"
					ariaHaspopup="true"
					ariaExpanded="false"
				>
					{' '}
					<i className="menu-icon fa fa-th"></i>Forms
				</div>
				{childs === true && (
					<ul className={`sub-menu children ${open ? '' : 'dropdown-menu'}`}>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-basic.html">Basic Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
						<li>
							<i className="menu-icon fa fa-th"></i>
							<a href="forms-advanced.html">Advanced Form</a>
						</li>
					</ul>
				)}
			</li>
		</>
	);
}
