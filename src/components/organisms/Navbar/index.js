import React from 'react';
import './index.css';
import LinkMenu from '../../molecules/LinkMenu';

export default function index() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky">
			<div className="container-fluid">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse " id="navbarNavDropdown">
					<ul className="navbar-nav ms-auto d-flex align-items-center">
						<LinkMenu
							href={'/'}
							type="link"
							liClass={'nav-item'}
							aClass="nav-link active"
							icon="BsBell"
							sizeIc={25}
						/>

						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="/#"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<img
									src="/Images/3.jpg"
									alt="profile"
									className="rounded-pill"
								/>
							</a>
							<ul
								className="dropdown-menu dropdown-menu-lg-end"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<LinkMenu
									title={'Another action'}
									href={'/'}
									aClass={'dropdown-item'}
								/>
								<LinkMenu
									title={'Another action'}
									href={'/'}
									aClass={'dropdown-item'}
								/>
								<LinkMenu
									title={'Another action'}
									href={'/'}
									aClass={'dropdown-item'}
								/>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
