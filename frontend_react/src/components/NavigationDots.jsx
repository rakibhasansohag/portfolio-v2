/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

function NavigationDots({ active }) {
	return (
		<div className='app__navigation'>
			{['home', 'about', 'projects', 'skills', 'testimonial', 'contact'].map(
				(item, index) => (
					<a
						className='app__navigation-dot'
						href={`#${item}`}
						key={item + index}
						style={active === item ? { backgroundColor: '#313BAC' } : {}}
					></a>
				),
			)}
		</div>
	);
}

export default NavigationDots;
