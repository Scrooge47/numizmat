import Topbar from './Topbar';
import React from 'react';

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Topbar />
			<main>{children}</main>
		</>
	);
};

export default Layout;
