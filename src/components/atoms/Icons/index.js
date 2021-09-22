import React from 'react';
import * as Icons from 'react-icons/bs';

export default function index({ icon, size, color }) {
	const Ic = Icons[icon];
	return <Ic color={color || 'black'} size={size || 25} />;
}
