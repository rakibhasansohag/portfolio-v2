import React from 'react';

import './App.css';
import { About, Footer, Skills, Header, Projects } from './container';
import { Navbar } from './components';

function App() {
	return (
		<div className='app'>
			<Navbar />
			<Header />
			<About />
			<Projects />
			<Skills />
			{/* <Testimonial /> */}
			<Footer />
		</div>
	);
}

export default App;
