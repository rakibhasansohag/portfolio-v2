import React, { useState } from 'react';

import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';


import './Navbar.scss';

const Navbar = () => {
	// Point: mobile device toggles navigation
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<nav className='app__navbar'>
				<div className='app_wrapper'>
					<div className='app__navbar-logo'>
						{/* <img src={images.logo} alt='logo' /> */}
						<h3>
							<a href='#home'>RS</a>
						</h3>
					</div>
					<ul className='app__navbar-links'>
						{['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
							<li className='app__flex p-text' key={`link-${item}`}>
								<div />
								<a href={`#${item}`}>{item}</a>
							</li>
						))}
					</ul>

					<motion.a
						href='https://drive.google.com/file/d/1oULu37JYveYo4nl5Fldid0TKwW4TsWPr/view?usp=drive_link'
						target='_blank'
						rel='noopener noreferrer'
						className='resume-btn desktop-only'
					>
						View Resume
					</motion.a>

					<div className='app__navbar-menu'>
						<HiMenuAlt4 onClick={() => setToggle(true)} />

						{toggle && (
							<motion.div
								whileInView={{ x: [300, 0] }}
								transition={{ duration: 0.85, ease: 'easeOut' }}
							>
								<HiX onClick={() => setToggle(false)} />

								<ul>
									{['home', 'about', 'projects', 'skills', 'contact'].map(
										(item) => (
											<li key={item}>
												<a href={`#${item}`} onClick={() => setToggle(false)}>
													{item}
												</a>
											</li>
										),
									)}

									<li style={{ marginTop: 'auto', width: '100%' }}>
										<a
											href='https://drive.google.com/file/d/1oULu37JYveYo4nl5Fldid0TKwW4TsWPr/view?usp=drive_link'
											target='_blank'
											rel='noopener noreferrer'
											className='resume-mobile resume-btn'
											onClick={() => setToggle(false)}
										>
											View Resume
										</a>
									</li>
								</ul>
							</motion.div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
