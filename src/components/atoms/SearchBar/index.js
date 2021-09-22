import React from 'react';
import { BsSearch } from 'react-icons/bs';
export default function index({ getFunc }) {
	return (
		<form className="container-fluid">
			<div className="input-group">
				<input
					onChange={getFunc}
					name="keyword"
					type="text"
					className="form-control"
					placeholder="Username"
					aria-label="Username"
					aria-describedby="basic-addon1"
				/>
				<span className="input-group-text" id="basic-addon1">
					<BsSearch />
				</span>
			</div>
		</form>
	);
}
