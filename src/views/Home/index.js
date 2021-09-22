import React from 'react';
import Navbar from 'components/organisms/Navbar';
import LeftBar from 'components/organisms/LeftBar';
export default function Home(props) {
	return (
		<>
			<div className="d-flex h-screen overflow-hidden">
				<div className="col-lg-2 col-md-2  d-none d-lg-block d-md-block">
					<LeftBar />
				</div>
				<div className="col-lg-10 col-md-10 col-12 position-relative ">
					<Navbar />
				</div>
			</div>
		</>
	);
}
