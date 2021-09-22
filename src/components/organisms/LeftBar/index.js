import React from 'react';
import LinkMenu from '../../molecules/LinkMenu/index';
import Icons from '../../atoms/Icons';
import logo from 'assets/images/bayu-buana-travel-services-logo.png';
import './index.css';
export default function index() {
	return (
		<>
			<div className="col-lg-2   d-none d-lg-block d-md-block leftBar bg-dark ">
				<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
					<a
						href="/"
						className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
					>
						<img
							className="fs-5 d-none d-sm-inline text-dark logo"
							src={logo}
							alt="logo"
						/>
					</a>
					<ul
						className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
						id="menu"
					>
						<li>
							<a
								href="#submenu2"
								data-bs-toggle="collapse"
								className="nav-link px-0 align-middle "
							>
								<Icons icon={'BsBarChartFill'} color="white" />
								<span className="ms-2 d-none d-sm-inline text-light">
									Bootstrap
								</span>
							</a>
							<ul
								className="collapse nav flex-column ms-1"
								id="submenu2"
								data-bs-parent="#menu"
							>
								<LinkMenu
									title={'Menu1'}
									href={'/'}
									liClass={'w-100'}
									aClass={'nav-link px-0 text-white'}
									icon={'BsBarChartFill'}
									colorIcon={'white'}
								/>
								<LinkMenu
									title={'Menu2'}
									href={'/'}
									liClass={'w-100'}
									aClass={'nav-link px-0 text-white'}
									icon={'BsBarChartFill'}
									colorIcon={'white'}
								/>
							</ul>
						</li>
						<li>
							<a href="/#" className="nav-link px-0 align-middle">
								<Icons icon={'BsBarChartFill'} color="white" />
								<span className="ms-1 d-none d-sm-inline text-light">
									Customers
								</span>{' '}
							</a>
						</li>
					</ul>
					<hr />
				</div>
			</div>
		</>
	);
}
